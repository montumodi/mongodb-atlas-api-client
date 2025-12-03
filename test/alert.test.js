const {describe, it, afterEach, before, beforeEach} = exports.lab = require("@hapi/lab").script();
const {expect} = require('@hapi/code');
const getClient = require('../src/index.js');
const Alert = require('../src/alert.js');
const HttpClient = require('../src/httpClient.js');
const {stub} = require("sinon");
const {MockAgent, setGlobalDispatcher} = require('urllib');

const baseUrl = "http://localhost:7001";
const projectId = "dummyProjectId";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl,
  "projectId": projectId
});

describe("Mongo Atlas Api Client - Alert", () => {

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

  describe("When alert is exported from index", () => {
    it("should export alert functions", async () => {
      expect(client.alert.get).to.be.function();
      expect(client.alert.getAll).to.be.function();
      expect(client.alert.acknowledge).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/alerts/myAlertId?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"alert": "name"});
      const result = await client.alert.get("myAlertId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"alert": "name"});
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/alerts?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"alert": "name"}]);
      const result = await client.alert.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"alert": "name"}]);
    });
  });

  describe("When acknowledge is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/alerts/myAlertId?key1=value1&key2=value2`,
        "method": "PATCH",
        "data": {"body": "value"}
      })
        .reply(200, [{"alert": "name"}]);
      const result = await client.alert.acknowledge("myAlertId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"alert": "name"}]);
    });
  });
});

describe("Alert Class", () => {

  const mockRequest = {
    "request": stub().returns(new Promise(resolve => resolve({"data": "some test data"})))
  };
  const mockHttpClient = new HttpClient(mockRequest, "dummyPublicKey", "dummyPrivateKey");

  const alert = new Alert(mockHttpClient, "dummyBaseUrl", "dummyProjectId");

  describe("When GetAll method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json", "headers": {}};
      await alert.getAll({"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/alerts?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When Get method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json", "headers": {}};
      await alert.get("alertId", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/alerts/alertId?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When Acknowledge method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {
        "digestAuth": "dummyPublicKey:dummyPrivateKey",
        "dataType": "json",
        "method": "PATCH",
        "data": {"body": "text"},
        "headers": {"Content-Type": "application/json"}};
      await alert.acknowledge("alertId", {"body": "text"}, {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/alerts/alertId?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

});