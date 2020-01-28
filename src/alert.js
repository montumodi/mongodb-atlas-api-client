const qs = require("qs");

class Alert {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async getAll(options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/alerts?${queryString}`)
    ).json();
    return response;
  }

  async get(alertId, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/alerts/${alertId}?${queryString}`)
    ).json();
    return response;
  }

  async acknowledge(alertId, body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/alerts/${alertId}?${queryString}`, {
        "method": "PATCH",
        "body": JSON.stringify(body),
        "headers": {"Content-Type": "application/json"}
      })
    ).json();
    return response;
  }
}

module.exports = Alert;

