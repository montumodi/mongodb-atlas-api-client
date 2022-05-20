const {getQueryStringFromOptions} = require("./helper");

class DataLake {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(dataLakeName, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes/${dataLakeName}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getLogsStream(dataLakeName, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = await this.client_.fetchStream(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes/${dataLakeName}/queryLogs.gz?${queryString}`, {
      "gzip": true,
      ...httpOptions
    });
    return response;
  }

  async getAll(options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes?${queryString}`, httpOptions)
    );
    return response;
  }

  async delete(dataLakeName, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes/${dataLakeName}?${queryString}`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }

  async update(dataLakeName, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes/${dataLakeName}?${queryString}`, {
        "method": "PATCH",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }

  async create(body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes?${queryString}`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = DataLake;

