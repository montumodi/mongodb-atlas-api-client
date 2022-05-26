const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const nock = require("nock");
const getClient = require("../src");
const AtlasUser = require("../src/atlasUser");
const HttpClient = require("../src/httpClient");
const sinon = require("sinon");

const baseUrl = "http://dummyBaseUrl";
const projectId = "dummyProjectId";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl,
  "projectId": projectId
});

describe("Mongo Atlas Api Client - Atlas User", () => {

  describe("When atlasUser is exported from index", () => {
    it("should export atlasUser functions", async () => {
      expect(client.atlasUser.getById).to.be.function();
      expect(client.atlasUser.getAll).to.be.function();
      expect(client.atlasUser.create).to.be.function();
      expect(client.atlasUser.getByName).to.be.function();
      expect(client.atlasUser.update).to.be.function();
    });
  });

  describe("When getByName is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/users/byName/myuser?key1=value1&key2=value2")
        .reply(200, {"user": "name"});
      const result = await client.atlasUser.getByName("myuser", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"user": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getById is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/users/someid?key1=value1&key2=value2")
        .reply(200, {"user": "name"});
      const result = await client.atlasUser.getById("someid", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"user": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/users?key1=value1&key2=value2`)
        .reply(200, [{"user": "name"}]);
      const result = await client.atlasUser.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"user": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .patch("/users/someId?key1=value1&key2=value2")
        .reply(200, [{"user": "name"}]);
      const result = await client.atlasUser.update("someId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"user": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post("/users?key1=value1&key2=value2")
        .reply(200, [{"user": "name"}]);
      const result = await client.atlasUser.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"user": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});

describe("AtlasUser Class", () => {

  const mockRequest = {
    "request": sinon.stub().returns(new Promise(resolve => resolve({"data": "some test data"})))
  };
  const mockHttpClient = new HttpClient(mockRequest, "dummyPublicKey", "dummyPrivateKey");

  const atlasUser = new AtlasUser(mockHttpClient, "dummyBaseUrl", "dummyProjectId");

  describe("When getByName method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json"};
      await atlasUser.getByName("username", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/users/byName/username?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When getById method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json"};
      await atlasUser.getById("userId", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/users/userId?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When getAll method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json"};
      await atlasUser.getAll({"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/users?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
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
      await atlasUser.update("userId", {"body": "text"}, {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/users/userId?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
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
      await atlasUser.create({"body": "text"}, {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/users?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

});
