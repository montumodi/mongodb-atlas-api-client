const qs = require("qs");

class Event {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(eventId, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/events/${eventId}?${queryString}`)
    ).json();
    return response;
  }

  async getAll(options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/events?${queryString}`)
    ).json();
    return response;
  }

  async getByOrganizationId(organizationId, eventId, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/events/${eventId}?${queryString}`)
    ).json();
    return response;
  }

  async getAllByOrganizationId(organizationId, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/orgs/${organizationId}/events?${queryString}`)
    ).json();
    return response;
  }

}

module.exports = Event;

