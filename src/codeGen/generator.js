function getFunctionsParts(endpoint) {
  const parts = endpoint.url.split("/");
  const paramsWithoutGroups = parts.filter(part => part !== "groups" && part !== "{GROUP-ID}");
  const params = paramsWithoutGroups.filter(part => part.startsWith("{"));
  const functionParams = params.map(param => param.substring(1, param.length - 1));

  const urlComponents = paramsWithoutGroups.map(param => {
    return param.startsWith("{") ? `\$${param}` : param;
  }).join("/");

  return { functionParams, urlComponents };
}

function getClassCode(className, functionSection) {
  return `const {getQueryStringFromOptions} = require("./helper");

  class ${className} {
  
    constructor(client, baseUrl, projectId) {
      this.client_ = client;
      this.baseUrl_ = baseUrl;
      this.projectId_ = projectId;
    }
  
    ${functionSection}
    
  }
  
  module.exports = ${className};`;
}

const functionMap = {
  "GET": generateGETMethodSnippet,
  "POST": generatePOSTMethodSnippet
}

function generateFunctions(endpointsArray) {
  let functionSection = "";
  endpointsArray.forEach(endpoint => {

    functionSection = functionSection.concat(functionMap[endpoint.method](endpoint));

    functionSection = functionSection.concat("\n\n");

  });

  return functionSection;
}

function generateCode(className, endpointsArray) {
  return getClassCode(className, generateFunctions(endpointsArray));
}

function generateGETMethodSnippet(endpoint) {

  const { functionParams, urlComponents } = getFunctionsParts(endpoint);

  functionParams.push("options = {}");
  const functionParamsString =  functionParams.join(", ");

  return `async ${endpoint.functionName}(${functionParamsString}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(\`\${this.baseUrl_}/groups/\${this.projectId_}${urlComponents}?\${queryString}\`, httpOptions)
    );
    return response;
  }`
}

function generatePOSTMethodSnippet(endpoint) {

  const { functionParams, urlComponents } = getFunctionsParts(endpoint);

  functionParams.push("body");
  functionParams.push("options = {}");
  const functionParamsString =  functionParams.join(", ");

  return `async ${endpoint.functionName}(${functionParamsString}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(\`\${this.baseUrl_}/groups/\${this.projectId_}${urlComponents}?\${queryString}\`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }`
}

module.exports = generateCode;

