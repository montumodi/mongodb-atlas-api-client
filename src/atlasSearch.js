const qs = require("qs");

class AtlasSearch {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(clusterName, indexId, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/fts/indexes/${indexId}?${queryString}`)
    ).json();
    return response;
  }

  async getAllAnalyzers(clusterName, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/fts/analyzers?${queryString}`)
    ).json();
    return response;
  }

  async upsertAnalyzer(clusterName, body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/fts/analyzers?${queryString}`, {
        "method": "PUT",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }

  async getAll(clusterName, databaseName, collectionName, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/fts/indexes/${databaseName}/${collectionName}?${queryString}`)
    ).json();
    return response;
  }

  async delete(clusterName, indexId, options) {
    const queryString = qs.stringify(options);
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/fts/indexes/${indexId}?${queryString}`, {
      "method": "DELETE"
    });
    return true;
  }

  async update(clusterName, indexId, body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/fts/indexes/${indexId}?${queryString}`, {
        "method": "PATCH",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }

  async create(clusterName, body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/fts/indexes?${queryString}`, {
        "method": "POST",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }
}

module.exports = AtlasSearch;

