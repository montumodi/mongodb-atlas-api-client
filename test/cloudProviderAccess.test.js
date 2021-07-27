const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const nock = require("nock");
const getClient = require("../src");

const baseUrl = "http://dummyBaseUrl";
const projectId = "dummyProjectId";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl,
  "projectId": projectId
});

describe("Mongo Atlas Api Client - cloudProviderAccess", () => {

  describe("When cloudProviderAccess is exported from index", () => {
    it("should export cloudProviderAccess functions", async () => {
      expect(client.cloudProviderAccess.getAll).to.be.function();
      expect(client.cloudProviderAccess.create).to.be.function();
      expect(client.cloudProviderAccess.delete).to.be.function();
      expect(client.cloudProviderAccess.update).to.be.function();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/cloudProviderAccess?key1=value1&key2=value2`)
        .reply(200, [{"cloudProviderAccess": "name"}]);
      const result = await client.cloudProviderAccess.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cloudProviderAccess": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .patch(`/groups/${projectId}/cloudProviderAccess/roleId?key1=value1&key2=value2`)
        .reply(200, [{"cloudProviderAccess": "name"}]);
      const result = await client.cloudProviderAccess.update("roleId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cloudProviderAccess": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/cloudProviderAccess?key1=value1&key2=value2`)
        .reply(200, [{"cloudProviderAccess": "name"}]);
      const result = await client.cloudProviderAccess.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cloudProviderAccess": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete(`/groups/${projectId}/cloudProviderAccess/aws/roleId?key1=value1&key2=value2`)
        .reply(200, true);
      const result = await client.cloudProviderAccess.delete("aws", "roleId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
