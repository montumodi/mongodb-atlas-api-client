const {getQueryStringFromOptions} = require("./helper");

class Event {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(eventId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/events/${eventId}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAll(options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/events?${queryString}`, httpOptions)
    );
    return response;
  }

  async getByOrganizationId(organizationId, eventId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/events/${eventId}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAllByOrganizationId(organizationId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/events?${queryString}`, httpOptions)
    );
    return response;
  }

}

module.exports = Event;

