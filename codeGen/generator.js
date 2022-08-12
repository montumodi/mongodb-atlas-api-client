const camelcase = require("camelcase");

const verbMap = {
  "GET": "get",
  "PUT": "upsert",
  "DELETE": "delete",
  "POST": "create",
  "PATCH": "update"
};

function generateNonParamFunctionPart(keywords, method) {
  const nonParamKeywords = keywords.filter(keyword => !keyword.isParam).reverse(i => i.keyword);
  let tempFuncName = camelcase(verbMap[method]);
  for (let i = 0; i < nonParamKeywords.length; i++) {
    const currentPascalCaseKeyword = camelcase(nonParamKeywords[i].keyword, {"pascalCase": true});
    if (i === 0) {
      tempFuncName = `${tempFuncName}${currentPascalCaseKeyword}`;
    }

    if (i !== 0 && i !== nonParamKeywords.length - 1) {
      tempFuncName = `${tempFuncName}In${currentPascalCaseKeyword}`;
    }

    if (nonParamKeywords.length > 1 && i === nonParamKeywords.length - 1) {
      tempFuncName = `${tempFuncName}For${currentPascalCaseKeyword}`;
    }
  }

  return tempFuncName;
}

function generateParamFunctionPart(keywords) {
  const paramKeywords = keywords.filter(keyword => keyword.isParam);
  let tempFuncName = "";
  for (let i = 0; i < paramKeywords.length; i++) {
    const currentPascalCaseKeyword = camelcase(paramKeywords[i].keyword, {"pascalCase": true});
    if (i === 0) {
      tempFuncName = `${tempFuncName}By${currentPascalCaseKeyword}`;
    }

    if (i > 0) {
      tempFuncName = `${tempFuncName}And${currentPascalCaseKeyword}`;
    }
  }

  return tempFuncName;
}

function generateFunctionNameByEndpoint(endpoint) {
  const parts = endpoint.url.split("/").filter(i => i);
  const paramsWithoutGroups = parts.filter(part => part !== "groups" && part !== "{GROUP-ID}");
  const keywords = paramsWithoutGroups.map(param => param.startsWith("{") ? {"keyword": camelcase(param.substring(1, param.length - 1)), "isParam": true} : {"keyword": param, "isParam": false});

  const npnParamFunctionPart = generateNonParamFunctionPart(keywords, endpoint.method);
  const paramFunctionPart = generateParamFunctionPart(keywords);
  const functionName = `${npnParamFunctionPart}${paramFunctionPart}`;
  return functionName;
}

function getFunctionsParts(endpoint) {
  const parts = endpoint.url.split("/");
  const paramsWithoutGroups = parts.filter(part => part !== "groups" && part !== "{GROUP-ID}");
  const params = paramsWithoutGroups.filter(part => part.startsWith("{"));
  const functionParams = params.map(param => camelcase(param.substring(1, param.length - 1)));

  const functionName = generateFunctionNameByEndpoint(endpoint);

  const urlComponents = paramsWithoutGroups.map(param => {
    return param.startsWith("{") ? `\$${camelcase(param)}` : param;
  }).join("/");

  return {functionParams, urlComponents, functionName};
}

const functionMap = {
  "GET": generateGetMethodSnippet,
  "POST": generateUpsertMethodSnippet,
  "PUT": generateUpsertMethodSnippet,
  "PATCH": generateUpsertMethodSnippet,
  "DELETE": generateDeleteMethodSnippet
};

function generateFunctions(endpointsArray) {
  let functionSection = "";
  endpointsArray.forEach(endpoint => {

    functionSection = functionSection.concat(functionMap[endpoint.method](endpoint));

    functionSection = functionSection.concat("\n\n");

  });

  return functionSection;
}

function generateClass(className, endpointsArray) {
  return `const {getQueryStringFromOptions} = require("./helper");

  class ${className} {
  
    constructor(client, baseUrl, projectId) {
      this.client_ = client;
      this.baseUrl_ = baseUrl;
      this.projectId_ = projectId;
    }
  
    ${generateFunctions(endpointsArray)}
    
  }
  
  module.exports = ${className};`;
}

function generateGetMethodSnippet(endpoint) {

  const {functionParams, urlComponents, functionName} = getFunctionsParts(endpoint);

  functionParams.push("options = {}");
  const functionParamsString = functionParams.join(", ");

  return `async ${functionName}(${functionParamsString}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(\`\${this.baseUrl_}/groups/\${this.projectId_}${urlComponents}?\${queryString}\`, httpOptions)
    );
    return response;
  }`;
}

function generateUpsertMethodSnippet(endpoint) {
  const {functionParams, urlComponents, functionName} = getFunctionsParts(endpoint);

  functionParams.push("body");
  functionParams.push("options = {}");
  const functionParamsString = functionParams.join(", ");

  return `async ${functionName}(${functionParamsString}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(\`\${this.baseUrl_}/groups/\${this.projectId_}${urlComponents}?\${queryString}\`, {
        "method": "${endpoint.method}",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }`;
}

function generateDeleteMethodSnippet(endpoint) {

  const {functionParams, urlComponents, functionName} = getFunctionsParts(endpoint);

  functionParams.push("options = {}");
  const functionParamsString = functionParams.join(", ");

  return `async ${functionName}(${functionParamsString}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    await this.client_.fetch(\`\${this.baseUrl_}/groups/\${this.projectId_}${urlComponents}?\${queryString}\`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }`;
}


module.exports = generateClass;
