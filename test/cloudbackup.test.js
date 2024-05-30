import {script} from "@hapi/lab";
export const lab = script();
const {describe, it} = lab;
import {expect} from "@hapi/code";
import nock from "nock";
import getClient from "../src/index.js";

const baseUrl = "http://dummyBaseUrl";
const projectId = "dummyProjectId";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl,
  "projectId": projectId
});

describe("Mongo Atlas Api Client - CloudBackup", () => {

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
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/clusters/mycluster/backup/snapshots/mysnapshot?key1=value1&key2=value2`)
        .reply(200, {"replicaSetName": "mycluster"});
      const result = await client.cloudBackup.getReplicaSetCloudBackup("mycluster", "mysnapshot", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"replicaSetName": "mycluster"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAllReplicaSetCloudBackups is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/clusters/mycluster/backup/snapshots?key1=value1&key2=value2`)
        .reply(200, [{"replicaSetName": "mycluster"}]);
      const result = await client.cloudBackup.getAllReplicaSetCloudBackups("mycluster", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"replicaSetName": "mycluster"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getSnapshotRestoreJob is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/clusters/mycluster/backup/restoreJobs/myrestorejob?key1=value1&key2=value2`)
        .reply(200, {"id": "myrestorejob"});
      const result = await client.cloudBackup.getSnapshotRestoreJob("mycluster", "myrestorejob", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"id": "myrestorejob"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When createSnapshotRestoreJob is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/clusters/mycluster/backup/restoreJobs?key1=value1&key2=value2`)
        .reply(200, {"id": "myrestorejob"});
      const result = await client.cloudBackup.createSnapshotRestoreJob("mycluster", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"id": "myrestorejob"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
