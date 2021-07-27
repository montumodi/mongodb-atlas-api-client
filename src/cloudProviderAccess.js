const qs = require("qs");

class CloudProviderAccess {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async getAll(options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/cloudProviderAccess?${queryString}`)
    ).json();
    return response;
  }

  async delete(cloudProvider, roleId, options) {
    const queryString = qs.stringify(options);
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/cloudProviderAccess/${cloudProvider}/${roleId}?${queryString}`, {
      "method": "DELETE"
    });
    return true;
  }

  async update(roleId, body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/cloudProviderAccess/${roleId}?${queryString}`, {
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
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/cloudProviderAccess?${queryString}`, {
        "method": "POST",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }
}

module.exports = CloudProviderAccess;

