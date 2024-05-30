import {script} from "@hapi/lab";
export const lab = script();
const {describe, it} = lab;
import {expect} from "@hapi/code";
import getClient from "../src/index.js";
import AtlasSearch from "../src/atlasSearch.js";
import HttpClient from "../src/httpClient.js";
import {stub} from "sinon";
import {MockAgent, setGlobalDispatcher} from "urllib";

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);

const baseUrl = "http://localhost:7001";
const projectId = "dummyProjectId";
const mockPool = mockAgent.get(baseUrl);

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl,
  "projectId": projectId
});

describe.only("Mongo Atlas Api Client - atlasSearch", () => {

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
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/fts/indexes/myindexId?key1=value1&key2=value2`,
        "method": "GET"
      }).reply(200, {"atlasSearch": "name"});
      const result = await client.atlasSearch.get("mycluster", "myindexId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"atlasSearch": "name"});
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/fts/indexes/mydatabasename/mycollectionname?key1=value1&key2=value2`,
        "method": "GET"
      }).reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.getAll("mycluster", "mydatabasename", "mycollectionname", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
    });
  });

  describe("When getAllAnalyzers is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/fts/analyzers?key1=value1&key2=value2`,
        "method": "GET"
      }).reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.getAllAnalyzers("mycluster", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/fts/indexes/indexId?key1=value1&key2=value2`,
        "method": "PATCH"
      }).reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.update("mycluster", "indexId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
    });
  });

  describe("When upsertAnalyzer is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/fts/analyzers?key1=value1&key2=value2`,
        "method": "PUT"
      }).reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.upsertAnalyzer("mycluster", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/fts/indexes?key1=value1&key2=value2`,
        "method": "POST"
      }).reply(200, [{"atlasSearch": "name"}]);
      const result = await client.atlasSearch.create("mycluster", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"atlasSearch": "name"}]);
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/fts/indexes/indexId?key1=value1&key2=value2`,
        "method": "DELETE"
      }).reply(200, true);
      const result = await client.atlasSearch.delete("mycluster", "indexId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
    });
  });
});

describe("AtlasSearch Class", () => {

  const mockRequest = {
    "request": stub().returns(new Promise(resolve => resolve({"data": "some test data"})))
  };
  const mockHttpClient = new HttpClient(mockRequest, "dummyPublicKey", "dummyPrivateKey");

  const atlasSearch = new AtlasSearch(mockHttpClient, "dummyBaseUrl", "dummyProjectId");

  describe("When getAllAnalyzers method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json"};
      await atlasSearch.getAllAnalyzers("clusterName", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/clusters/clusterName/fts/analyzers?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When Get method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json"};
      await atlasSearch.get("clusterName", "indexId", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/clusters/clusterName/fts/indexes/indexId?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When upsertAnalyzer method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {
        "digestAuth": "dummyPublicKey:dummyPrivateKey",
        "dataType": "json",
        "method": "PUT",
        "data": {"body": "text"},
        "headers": {"Content-Type": "application/json"}};
      await atlasSearch.upsertAnalyzer("clusterName", {"body": "text"}, {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/clusters/clusterName/fts/analyzers?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When getAll method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json"};
      await atlasSearch.getAll("clusterName", "databaseName", "collectionName", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/clusters/clusterName/fts/indexes/databaseName/collectionName?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When delete method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {
        "digestAuth": "dummyPublicKey:dummyPrivateKey",
        "dataType": "json",
        "method": "DELETE"
      };
      await atlasSearch.delete("clusterName", "indexId", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/clusters/clusterName/fts/indexes/indexId?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When update method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {
        "digestAuth": "dummyPublicKey:dummyPrivateKey",
        "dataType": "json",
        "method": "PATCH",
        "data": {"body": "text"},
        "headers": {"Content-Type": "application/json"}
      };
      await atlasSearch.update("clusterName", "indexId", {"body": "text"}, {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/clusters/clusterName/fts/indexes/indexId?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When create method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {
        "digestAuth": "dummyPublicKey:dummyPrivateKey",
        "dataType": "json",
        "method": "POST",
        "data": {"body": "text"},
        "headers": {"Content-Type": "application/json"}
      };
      await atlasSearch.create("clusterName", {"body": "text"}, {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/clusters/clusterName/fts/indexes?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

});
