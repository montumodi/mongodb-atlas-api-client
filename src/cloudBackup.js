const {getQueryStringFromOptions} = require("mongodb-atlas-api-client/src/helper");

class CloudBackup {

  constructor(client, baseUrl, projectId) {
    this.client_ = client;
    this.baseUrl_ = baseUrl;
    this.projectId_ = projectId;
  }

  async getReplicaSetCloudBackup(clustername, snapshotId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clustername}/backup/snapshots/${snapshotId}?${queryString}`, httpOptions)
    );
    return response;
  }

  async getAllReplicaSetCloudBackups(clustername, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clustername}/backup/snapshots?${queryString}`, httpOptions)
    );
    return response;
  }

  async getRestoreSnapshotJob(clustername, restoreJobId, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clustername}/backup/restoreJobs/${restoreJobId}?${queryString}`, httpOptions)
    );
    return response;
  }

  async createRestoreSnapshotJob(clustername, body, options = {}) {
    const queryString = getQueryStringFromOptions(options);
    const httpOptions = options.httpOptions;
    const response = (
      await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clustername}/backup/restoreJobs?${queryString}`, {
        "method": "POST",
        "data": body,
        "headers": {"Content-Type": "application/json"},
        ...httpOptions
      })
    );
    return response;
  }
}

module.exports = CloudBackup;

