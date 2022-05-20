const {getQueryStringFromOptions} = require("./helper");

class CustomDbRole {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(rolename, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/customDBRoles/roles/${rolename}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAll(options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/customDBRoles/roles?${queryString}`, httpOptions)
    );
    return response;
  }

  async delete(rolename, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/customDBRoles/roles/${rolename}?${queryString}`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }

  async update(rolename, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/customDBRoles/roles/${rolename}?${queryString}`, {
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
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/customDBRoles/roles?${queryString}`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = CustomDbRole;

