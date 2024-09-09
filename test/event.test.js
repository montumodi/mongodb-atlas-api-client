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

describe("Mongo Atlas Api Client - Event", () => {

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

  describe("When event is exported from index", () => {
    it("should export event functions", async () => {
      expect(client.event.get).to.be.function();
      expect(client.event.getAll).to.be.function();
      expect(client.event.getAllByOrganizationId).to.be.function();
      expect(client.event.getByOrganizationId).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/events/myeventId?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"event": "name"});
      const result = await client.event.get("myeventId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"event": "name"});

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/events?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"event": "name"}]);
      const result = await client.event.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"event": "name"}]);

    });
  });

  describe("When getByOrganizationId is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/orgs/myOrgId/events/myeventId?key1=value1&key2=value2",
        "method": "get"
      })
        .reply(200, {"event": "name"});
      const result = await client.event.getByOrganizationId("myOrgId", "myeventId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"event": "name"});

    });
  });

  describe("When getAllByOrganizationId is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/orgs/myOrgId/events?key1=value1&key2=value2",
        "method": "get"
      })
        .reply(200, [{"event": "name"}]);
      const result = await client.event.getAllByOrganizationId("myOrgId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"event": "name"}]);

    });
  });
});
