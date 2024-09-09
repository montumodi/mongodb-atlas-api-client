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

describe("Mongo Atlas Api Client - User", () => {

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

  describe("When user is exported from index", () => {
    it("should export user functions", async () => {
      expect(client.user.get).to.be.function();
      expect(client.user.getAll).to.be.function();
      expect(client.user.create).to.be.function();
      expect(client.user.delete).to.be.function();
      expect(client.user.update).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers/admin/myUsername?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"projectWhitelist": "name"});
      const result = await client.user.get("myUsername", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"projectWhitelist": "name"});

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.user.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);

    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers/admin/myUsername?key1=value1&key2=value2`,
        "method": "PATCH",
        "data": {"body": "value"}
      })
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.user.update("myUsername", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);

    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers?key1=value1&key2=value2`,
        "method": "POST",
        "data": {"body": "value"}
      })
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.user.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers/admin/myUsername?key1=value1&key2=value2`,
        "method": "DELETE"
      })
        .reply(200, true);
      const result = await client.user.delete("myUsername", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });
});
