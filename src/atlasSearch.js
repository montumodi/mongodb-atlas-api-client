const {getQueryStringFromOptions} = require("./helper");

class AtlasSearch {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(clusterName, indexId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/search/indexes/${indexId}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAll(clusterName, databaseName, collectionName, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/search/indexes/${databaseName}/${collectionName}?${queryString}`, httpOptions)
    );
    return response;
  }

  async delete(clusterName, indexId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/search/indexes/${indexId}?${queryString}`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }

  async update(clusterName, indexId, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/search/indexes/${indexId}?${queryString}`, {
        "method": "PATCH",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }

  async create(clusterName, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/search/indexes?${queryString}`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = AtlasSearch;

