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

describe("Mongo Atlas Api Client - Custom Db Role", () => {

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

  describe("When customDbRole is exported from index", () => {
    it("should export customDbRole functions", async () => {
      expect(client.customDbRole.get).to.be.function();
      expect(client.customDbRole.getAll).to.be.function();
      expect(client.customDbRole.create).to.be.function();
      expect(client.customDbRole.delete).to.be.function();
      expect(client.customDbRole.update).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/customDBRoles/roles/rolename?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"customDbRole": "name"});
      const result = await client.customDbRole.get("rolename", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"customDbRole": "name"});

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/customDBRoles/roles?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"customDbRole": "name"}]);
      const result = await client.customDbRole.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"customDbRole": "name"}]);

    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/customDBRoles/roles/rolename?key1=value1&key2=value2`,
        "method": "PATCH",
        "data": {"body": "value"}
      })
        .reply(200, [{"customDbRole": "name"}]);
      const result = await client.customDbRole.update("rolename", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"customDbRole": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/customDBRoles/roles/rolename?key1=value1&key2=value2`,
        "method": "delete"
      })
        .reply(200, true);
      const result = await client.customDbRole.delete("rolename", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/customDBRoles/roles?key1=value1&key2=value2`,
        "method": "post",
        "data": {"body": "value"}
      })
        .reply(200, [{"customDbRole": "name"}]);
      const result = await client.customDbRole.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"customDbRole": "name"}]);

    });
  });
});
