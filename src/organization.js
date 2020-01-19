const qs = require("qs");

class Organization {

  constructor(client, baseUrl) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
  }

  async getById(organizationId, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`)
    ).json();
    return response;
  }

  async getAllUsersForOrganization(organizationId, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/users?${queryString}`)
    ).json();
    return response;
  }

  async getAllProjectsForOrganization(organizationId, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/groups?${queryString}`)
    ).json();
    return response;
  }

  async getAll(options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs?${queryString}`)
    ).json();
    return response;
  }

  async delete(organizationId, options) {
    const queryString = qs.stringify(options);
    await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`, {
      "method": "DELETE"
    });
    return true;
  }

  async rename(organizationId, body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`, {
        "method": "PATCH",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }
}

module.exports = Organization;

