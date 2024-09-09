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

describe("Mongo Atlas Api Client - cloudProviderAccess", () => {

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
      mockPool.intercept({
        "path": `/groups/${projectId}/cloudProviderAccess?key1=value1&key2=value2`,
        "method": "GET"
      })
        .reply(200, [{"cloudProviderAccess": "name"}]);
      const result = await client.cloudProviderAccess.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cloudProviderAccess": "name"}]);

    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/cloudProviderAccess/roleId?key1=value1&key2=value2`,
        "method": "PATCH",
        "data": {"body": "value"}
      })
        .reply(200, [{"cloudProviderAccess": "name"}]);
      const result = await client.cloudProviderAccess.update("roleId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cloudProviderAccess": "name"}]);

    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/cloudProviderAccess?key1=value1&key2=value2`,
        "method": "POST",
        "data": {"body": "value"}
      })
        .reply(200, [{"cloudProviderAccess": "name"}]);
      const result = await client.cloudProviderAccess.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cloudProviderAccess": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/cloudProviderAccess/aws/roleId?key1=value1&key2=value2`,
        "method": "DELETE"
      })
        .reply(200, true);
      const result = await client.cloudProviderAccess.delete("aws", "roleId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });
});
