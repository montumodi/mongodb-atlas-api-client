const {getQueryStringFromOptions} = require("./helper");

class ProjectAccesslist {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(accesslistentry, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList/${accesslistentry}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAll(options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList?${queryString}`, httpOptions)
    );
    return response;
  }

  async delete(accesslistentry, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList/${accesslistentry}?${queryString}`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }

  async update(body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList?${queryString}`, {
        "method": "POST",
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
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/accessList?${queryString}`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = ProjectAccesslist;

