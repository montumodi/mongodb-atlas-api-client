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

describe("Mongo Atlas Api Client - atlasSearch", () => {

  describe("When atlasSearch is exported from index", () => {
    it("should export atlasSearch functions", async () => {
      expect(client.atlasSearch.get).to.be.function();
      expect(client.atlasSearch.getAll).to.be.function();
      expect(client.atlasSearch.create).to.be.function();
      expect(client.atlasSearch.delete).to.be.function();
      expect(client.atlasSearch.update).to.be.function();
      expect(client.atlasSearch.getAllAnalyzers).to.be.function();
      expect(client.atlasSearch.upsertAnalyzer).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/clusters/mycluster/fts/indexes/myindexId?key1=value1&key2=value2`)
        .reply(200, {"atlasSearch": "name"});
      const result = await client.atlasSearch.get("mycluster", "myindexId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"atlasSearch": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/clusters/mycluster/fts/indexes/mydatabasename/mycollectionname?key1=value1&key2=value2`)
        .reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.getAll("mycluster", "mydatabasename", "mycollectionname", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAllAnalyzers is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/clusters/mycluster/fts/analyzers?key1=value1&key2=value2`)
        .reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.getAllAnalyzers("mycluster", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .patch(`/groups/${projectId}/clusters/mycluster/fts/indexes/indexId?key1=value1&key2=value2`)
        .reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.update("mycluster", "indexId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When upsertAnalyzer is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .put(`/groups/${projectId}/clusters/mycluster/fts/analyzers?key1=value1&key2=value2`)
        .reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.upsertAnalyzer("mycluster", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/clusters/mycluster/fts/indexes?key1=value1&key2=value2`)
        .reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.create("mycluster", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete(`/groups/${projectId}/clusters/mycluster/fts/indexes/indexId?key1=value1&key2=value2`)
        .reply(200, true);
      const result = await client.atlasSearch.delete("mycluster", "indexId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
