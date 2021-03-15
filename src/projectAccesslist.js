const qs = require("qs");

class ProjectAccesslist {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(accesslistentry, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList/${accesslistentry}?${queryString}`)
    ).json();
    return response;
  }

  async getAll(options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList?${queryString}`)
    ).json();
    return response;
  }

  async delete(accesslistentry, options) {
    const queryString = qs.stringify(options);
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList/${accesslistentry}?${queryString}`, {
      "method": "DELETE"
    });
    return true;
  }

  async update(body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList?${queryString}`, {
        "method": "POST",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }

  async create(body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList?${queryString}`, {
        "method": "POST",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }
}

module.exports = ProjectAccesslist;

