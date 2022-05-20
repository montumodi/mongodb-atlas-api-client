const {getQueryStringFromOptions} = require("./helper");

class Organization {

  constructor(client, baseUrl) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
  }

  async getById(organizationId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAllUsersForOrganization(organizationId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/users?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAllProjectsForOrganization(organizationId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/groups?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAll(options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs?${queryString}`, httpOptions)
    );
    return response;
  }

  async delete(organizationId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }

  async rename(organizationId, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`, {
        "method": "PATCH",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }

  async invite(organizationId, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/invites?${queryString}`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = Organization;

