const qs = require("qs");

class User {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async getUser(username, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers/admin/${username}?${queryString}`)
      ).json();
    return response;
  }
  
  async getUsers(options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers?${queryString}`)
      ).json();
    return response;
  }
  
  async deleteUser(username, options) {
    const queryString = qs.stringify(options);
    const response =
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers/admin/${username}?${queryString}`, {
        method: "DELETE"
      });
    return true;
  }
  
  async updateUser(username, body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers/admin/${username}?${queryString}`, {
        method: "PATCH",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      })
      ).json();
    return response;
  }
  
  async createUser(body, options) {
    const queryString = qs.stringify(options);
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/databaseUsers?${queryString}`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" }
      })
      ).json();
    return response;
  }
}

module.exports = User;

