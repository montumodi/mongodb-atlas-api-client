const {getQueryStringFromOptions} = require("./helper");

function getDatabaseNameAndOptions(databaseNameOrOptions, options) {
  if (typeof databaseNameOrOptions === "object") {
    return {"databaseName": "admin", "options": databaseNameOrOptions};
  }
  return {"databaseName": databaseNameOrOptions, options};
}

class User {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async get(username, databaseNameOrOptions = "admin", options = {}) {
    const normalized = getDatabaseNameAndOptions(databaseNameOrOptions, options);
    const databaseName = normalized.databaseName;
    const requestOptions = normalized.options;
    const queryString = getQueryStringFromOptions(requestOptions);
    const httpOptions = requestOptions.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers/${databaseName}/${username}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAll(options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers?${queryString}`, httpOptions)
    );
    return response;
  }

  async delete(username, databaseNameOrOptions = "admin", options = {}) {
    const normalized = getDatabaseNameAndOptions(databaseNameOrOptions, options);
    const databaseName = normalized.databaseName;
    const requestOptions = normalized.options;
    const queryString = getQueryStringFromOptions(requestOptions);
    const httpOptions = requestOptions.httpOptions;
    await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers/${databaseName}/${username}?${queryString}`, {
      "method": "DELETE",
      ...httpOptions
    });
    return true;
  }

  async update(username, body, databaseNameOrOptions = "admin", options = {}) {
    const normalized = getDatabaseNameAndOptions(databaseNameOrOptions, options);
    const databaseName = normalized.databaseName;
    const requestOptions = normalized.options;
    const queryString = getQueryStringFromOptions(requestOptions);
    const httpOptions = requestOptions.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers/${databaseName}/${username}?${queryString}`, {
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
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers?${queryString}`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = User;

