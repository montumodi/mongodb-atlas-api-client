class Organization {

  constructor(client, baseUrl) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
  }

  async getById(organizationId, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`)
    ).json();
    return response;
  }

  async getAllUsersForOrganization(organizationId, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/users?${queryString}`)
    ).json();
    return response;
  }

  async getAllProjectsForOrganization(organizationId, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/groups?${queryString}`)
    ).json();
    return response;
  }

  async getAll(options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs?${queryString}`)
    ).json();
    return response;
  }

  async delete(organizationId, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`, {
      "method": "DELETE"
    });
    return true;
  }

  async rename(organizationId, body, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}?${queryString}`, {
        "method": "PATCH",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }

  async invite(organizationId, body, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/invites?${queryString}`, {
        "method": "POST",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }
}

module.exports = Organization;

