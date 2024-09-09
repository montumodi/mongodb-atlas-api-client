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

describe("Mongo Atlas Api Client - dataLake", () => {

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

  describe("When dataLake is exported from index", () => {
    it("should export dataLake functions", async () => {
      expect(client.dataLake.get).to.be.function();
      expect(client.dataLake.getAll).to.be.function();
      expect(client.dataLake.getLogsStream).to.be.function();
      expect(client.dataLake.create).to.be.function();
      expect(client.dataLake.delete).to.be.function();
      expect(client.dataLake.update).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/dataLakes/mydataLakename?key1=value1&key2=value2`,
        "method": "GET"
      })
        .reply(200, {"datalake": "name"});
      const result = await client.dataLake.get("mydataLakename", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"datalake": "name"});

    });
  });

  describe("When getLogsStream is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/dataLakes/mydataLakename/queryLogs.gz?key1=value1&key2=value2`,
        "method": "GET"
      })
        .reply(200, Buffer.from("Some test string", "utf8"), {"headers": {"accept": "application/gzip"}});
      const result = await client.dataLake.getLogsStream("mydataLakename", {"key1": "value1", "key2": "value2"});
      expect(result.pipe).to.exist();

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/dataLakes?key1=value1&key2=value2`,
        "method": "GET"
      })
        .reply(200, [{"datalake": "name"}]);
      const result = await client.dataLake.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"datalake": "name"}]);

    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/dataLakes/mydataLakename?key1=value1&key2=value2`,
        "method": "PATCH",
        "data": {"body": "value"}
      })
        .reply(200, [{"datalake": "name"}]);
      const result = await client.dataLake.update("mydataLakename", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"datalake": "name"}]);

    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/dataLakes?key1=value1&key2=value2`,
        "method": "POST",
        "data": {"body": "value"}
      })
        .reply(200, [{"dataLakes": "name"}]);
      const result = await client.dataLake.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"dataLakes": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/dataLakes/mydataLakename?key1=value1&key2=value2`,
        "method": "DELETE"
      })
        .reply(200, true);
      const result = await client.dataLake.delete("mydataLakename", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });
});