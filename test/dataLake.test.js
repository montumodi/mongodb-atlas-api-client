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

describe("Mongo Atlas Api Client - dataLake", () => {

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
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/dataLakes/mydataLakename?key1=value1&key2=value2`)
        .reply(200, {"datalake": "name"});
      const result = await client.dataLake.get("mydataLakename", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"datalake": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getLogsStream is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/dataLakes/mydataLakename/queryLogs.gz?key1=value1&key2=value2`)
        .reply(200, Buffer.from("Some test string", "utf8"), {"headers": {"accept": "application/gzip"}});
      const result = await client.dataLake.getLogsStream("mydataLakename", {"key1": "value1", "key2": "value2"});
      expect(result.pipe).to.exist();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/dataLakes?key1=value1&key2=value2`)
        .reply(200, [{"datalake": "name"}]);
      const result = await client.dataLake.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"datalake": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .patch(`/groups/${projectId}/dataLakes/mydataLakename?key1=value1&key2=value2`)
        .reply(200, [{"datalake": "name"}]);
      const result = await client.dataLake.update("mydataLakename", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"datalake": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/dataLakes?key1=value1&key2=value2`)
        .reply(200, [{"dataLakes": "name"}]);
      const result = await client.dataLake.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"dataLakes": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete(`/groups/${projectId}/dataLakes/mydataLakename?key1=value1&key2=value2`)
        .reply(200, true);
      const result = await client.dataLake.delete("mydataLakename", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
