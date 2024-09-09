const {describe, it, afterEach, before, beforeEach} = exports.lab = require("@hapi/lab").script();
const {expect} = require('@hapi/code');
const getClient = require('../src/index.js');
const {MockAgent, setGlobalDispatcher} = require('urllib');

const baseUrl = "http://localhost:7001";
const projectId = "dummyProjectId";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl,
  "projectId": projectId
});

describe("Mongo Atlas Api Client - CloudBackup", () => {

  let mockAgent;
  let mockPool;
  before(() => {
    mockAgent = new MockAgent();
    setGlobalDispatcher(mockAgent);
  });

  beforeEach(() => {
    mockPool = mockAgent.get(baseUrl);
  });

  afterEach(() => {
    mockAgent.assertNoPendingInterceptors();
  });

  describe("When cluster is exported from index", () => {
    it("should export cluster functions", async () => {
      expect(client.cloudBackup.getReplicaSetCloudBackup).to.be.function();
      expect(client.cloudBackup.getAllReplicaSetCloudBackups).to.be.function();
      expect(client.cloudBackup.getSnapshotRestoreJob).to.be.function();
      expect(client.cloudBackup.createSnapshotRestoreJob).to.be.function();
    });
  });

  describe("When getReplicaSetCloudBackup is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/backup/snapshots/mysnapshot?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"replicaSetName": "mycluster"});
      const result = await client.cloudBackup.getReplicaSetCloudBackup("mycluster", "mysnapshot", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"replicaSetName": "mycluster"});

    });
  });

  describe("When getAllReplicaSetCloudBackups is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/backup/snapshots?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"replicaSetName": "mycluster"}]);
      const result = await client.cloudBackup.getAllReplicaSetCloudBackups("mycluster", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"replicaSetName": "mycluster"}]);

    });
  });

  describe("When getSnapshotRestoreJob is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/backup/restoreJobs/myrestorejob?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"id": "myrestorejob"});
      const result = await client.cloudBackup.getSnapshotRestoreJob("mycluster", "myrestorejob", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"id": "myrestorejob"});

    });
  });

  describe("When createSnapshotRestoreJob is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/backup/restoreJobs?key1=value1&key2=value2`,
        "method": "post",
        "data": {"body": "value"}
      })
        .reply(200, {"id": "myrestorejob"});
      const result = await client.cloudBackup.createSnapshotRestoreJob("mycluster", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"id": "myrestorejob"});

    });
  });
});
