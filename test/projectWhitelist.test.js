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

describe("Mongo Atlas Api Client - Project Whitelist", () => {

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

  describe("When projectWhitelist is exported from index", () => {
    it("should export projectWhitelist functions", async () => {
      expect(client.projectWhitelist.get).to.be.function();
      expect(client.projectWhitelist.getAll).to.be.function();
      expect(client.projectWhitelist.create).to.be.function();
      expect(client.projectWhitelist.delete).to.be.function();
      expect(client.projectWhitelist.update).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/whitelist/myWhitelistEntry?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"projectWhitelist": "name"});
      const result = await client.projectWhitelist.get("myWhitelistEntry", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"projectWhitelist": "name"});

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/whitelist?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.projectWhitelist.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);

    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/whitelist?key1=value1&key2=value2`,
        "method": "POST",
        "data": {"body": "value"}
      })
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.projectWhitelist.update({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);

    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/whitelist?key1=value1&key2=value2`,
        "method": "POST",
        "data": {"body": "value"}
      })
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.projectWhitelist.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/whitelist/myWhitelistEntry?key1=value1&key2=value2`,
        "method": "delete"
      })
        .reply(200, true);
      const result = await client.projectWhitelist.delete("myWhitelistEntry", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });
});
