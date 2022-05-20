const {getQueryStringFromOptions} = require("./helper");

class Alert {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async getAll(options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/alerts?${queryString}`, httpOptions)
    );
    return response;
  }

  async get(alertId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/alerts/${alertId}?${queryString}`, httpOptions)
    );
    return response;
  }

  async acknowledge(alertId, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/alerts/${alertId}?${queryString}`, {
        "method": "PATCH",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = Alert;

