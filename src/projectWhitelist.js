class ProjectWhitelist {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(whitelistentry, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/whitelist/${whitelistentry}?${queryString}`)
    ).json();
    return response;
  }

  async getAll(options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/whitelist?${queryString}`)
    ).json();
    return response;
  }

  async delete(whitelistentry, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/whitelist/${whitelistentry}?${queryString}`, {
      "method": "DELETE"
    });
    return true;
  }

  async update(body, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/whitelist?${queryString}`, {
        "method": "POST",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }

  async create(body, options) {
    const urlparams = new URLSearchParams(options);
    const queryString = urlparams.toString();
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/whitelist?${queryString}`, {
        "method": "POST",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }
}

module.exports = ProjectWhitelist;

