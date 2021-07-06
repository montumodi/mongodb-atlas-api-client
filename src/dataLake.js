const qs = require("qs");

class DataLake {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(dataLakeName, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes/${dataLakeName}?${queryString}`)
    ).json();
    return response;
  }

  async getLogsStream(dataLakeName, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes/${dataLakeName}/queryLogs.gz?${queryString}`, {
        "headers": {
          "Accept": "application/gzip"
        }
      })
    );
    return response.body;
  }

  async getAll(options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes?${queryString}`)
    ).json();
    return response;
  }

  async delete(dataLakeName, options) {
    const queryString = qs.stringify(options);
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes/${dataLakeName}?${queryString}`, {
      "method": "DELETE"
    });
    return true;
  }

  async update(dataLakeName, body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes/${dataLakeName}?${queryString}`, {
        "method": "PATCH",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }

  async create(body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/dataLakes?${queryString}`, {
        "method": "POST",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }
}

module.exports = DataLake;

