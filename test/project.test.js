const {describe, it, afterEach, before, beforeEach} = exports.lab = require("@hapi/lab").script();
const {expect} = require('@hapi/code');
const getClient = require('../src/index.js');
const {MockAgent, setGlobalDispatcher} = require('urllib');

const baseUrl = "http://localhost:7001";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl
});

describe("Mongo Atlas Api Client - Project", () => {

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

  describe("When project is exported from index", () => {
    it("should export project functions", async () => {
      expect(client.project.getById).to.be.function();
      expect(client.project.getByName).to.be.function();
      expect(client.project.getAll).to.be.function();
      expect(client.project.getTeamsByProjectId).to.be.function();
      expect(client.project.getByName).to.be.function();
      expect(client.project.delete).to.be.function();
      expect(client.project.removeUserFromProject).to.be.function();
      expect(client.project.assignTeams).to.be.function();
    });
  });

  describe("When getById is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/groups/projectId?key1=value1&key2=value2",
        "method": "GET"
      })
        .reply(200, {"project": "name"});
      const result = await client.project.getById("projectId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"project": "name"});

    });
  });

  describe("When getByName is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/groups/byName/projectName?key1=value1&key2=value2",
        "method": "GET"
      })
        .reply(200, {"project": "name"});
      const result = await client.project.getByName("projectName", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"project": "name"});

    });
  });

  describe("When getTeamsByProjectId is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/groups/projectId/teams?key1=value1&key2=value2",
        "method": "GET"
      })
        .reply(200, {"project": "name"});
      const result = await client.project.getTeamsByProjectId("projectId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"project": "name"});

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/groups?key1=value1&key2=value2",
        "method": "GET"
      })
        .reply(200, [{"project": "name"}]);
      const result = await client.project.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"project": "name"}]);

    });
  });

  describe("When assignTeams is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/groups/projectId/teams?key1=value1&key2=value2",
        "method": "POST",
        "data": {"body": "value"}
      })
        .reply(200, [{"project": "name"}]);
      const result = await client.project.assignTeams("projectId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"project": "name"}]);

    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/groups?key1=value1&key2=value2",
        "method": "POST",
        "data": {"body": "value"}
      })
        .reply(200, [{"project": "name"}]);
      const result = await client.project.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"project": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/groups/projectId?key1=value1&key2=value2",
        "method": "DELETE"
      })
        .reply(200, true);
      const result = await client.project.delete("projectId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });

  describe("When removeUserFromProject is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/groups/projectId/users/userId?key1=value1&key2=value2",
        "method": "DELETE"
      })
        .reply(200, true);
      const result = await client.project.removeUserFromProject("projectId", "userId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });
});
