const {getQueryStringFromOptions} = require("./helper");

class Project {

  constructor(client, baseUrl) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
  }

  async getById(projectId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${projectId}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getByName(projectName, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/byName/${projectName}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getTeamsByProjectId(projectId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${projectId}/teams?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAll(options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups?${queryString}`, httpOptions)
    );
    return response;
  }

  async delete(projectId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    await this.client_.fetch(`${this.baseUrl_}/groups/${projectId}?${queryString}`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }

  async removeUserFromProject(projectId, userId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    await this.client_.fetch(`${this.baseUrl_}/groups/${projectId}/users/${userId}?${queryString}`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }

  async assignTeams(projectId, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${projectId}/teams?${queryString}`, {
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
      await this.client_.fetch(`${this.baseUrl_}/groups?${queryString}`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = Project;

