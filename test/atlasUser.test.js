const {describe, it, after, afterEach, before, beforeEach} = exports.lab = require("@hapi/lab").script();
const {expect} = require('@hapi/code');
const getClient = require('../src/index.js');
const AtlasUser = require('../src/atlasUser.js');
const HttpClient = require('../src/httpClient.js');
const {stub} = require("sinon");
const {Agent, MockAgent, setGlobalDispatcher} = require('urllib');

const baseUrl = "http://localhost:7001";
const projectId = "dummyProjectId";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl,
  "projectId": projectId
});

describe("Mongo Atlas Api Client - Atlas User", () => {

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

  after(() => {
    setGlobalDispatcher(new Agent());
  });

  describe("When atlasUser is exported from index", () => {
    it("should export atlasUser functions", async () => {
      expect(client.atlasUser.getById).to.be.function();
      expect(client.atlasUser.getAll).to.be.function();
      expect(client.atlasUser.create).to.be.function();
      expect(client.atlasUser.getByName).to.be.function();
      expect(client.atlasUser.updateRoles).to.be.function();
    });

    it("should export cloudUser as the preferred name", async () => {
      expect(client.cloudUser).to.equal(client.atlasUser);
      expect(client.cloudUser.getById).to.be.function();
    });
  });

  describe("When getByName is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/users?key1=value1&key2=value2&username=myuser`,
        "method": "get"
      })
        .reply(200, {"user": "name"});
      const result = await client.atlasUser.getByName("myuser", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"user": "name"});
    });
  });

  describe("When getById is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/users/someid?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"user": "name"});
      const result = await client.atlasUser.getById("someid", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"user": "name"});
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/users?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"user": "name"}]);
      const result = await client.atlasUser.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"user": "name"}]);
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/users?key1=value1&key2=value2`,
        "method": "POST",
        "data": {"body": "value"}
      })
        .reply(200, [{"user": "name"}]);
      const result = await client.atlasUser.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"user": "name"}]);
    });
  });
});

describe("AtlasUser Class", () => {

  const mockRequest = {
    "request": stub().returns(new Promise(resolve => resolve({"data": "some test data"})))
  };
  const mockHttpClient = new HttpClient(mockRequest, "dummyPublicKey", "dummyPrivateKey");

  const atlasUser = new AtlasUser(mockHttpClient, "dummyBaseUrl", "dummyProjectId");

  beforeEach(() => {
    mockRequest.request.resetHistory();
  });

  describe("When getByName method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json", "headers": {"Accept": "application/vnd.atlas.2025-03-12+json"}};
      await atlasUser.getByName("username", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/users?queryStringParam1=value1&username=username", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When getById method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json", "headers": {"Accept": "application/vnd.atlas.2025-03-12+json"}};
      await atlasUser.getById("userId", {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/users/userId?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When getAll method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {"digestAuth": "dummyPublicKey:dummyPrivateKey", "dataType": "json", "headers": {"Accept": "application/vnd.atlas.2025-03-12+json"}};
      await atlasUser.getAll({"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/users?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When create method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {
        "digestAuth": "dummyPublicKey:dummyPrivateKey",
        "dataType": "json",
        "method": "POST",
        "data": {"body": "text"},
        "headers": {"Accept": "application/vnd.atlas.2025-03-12+json", "Content-Type": "application/json"}
      };
      await atlasUser.create({"body": "text"}, {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/users?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When updateRoles method is called with querystring parameters and httpOptions", () => {
    it("Should send appropriate parameters to underlying request", async () => {
      const requestParams = {
        "digestAuth": "dummyPublicKey:dummyPrivateKey",
        "dataType": "json",
        "method": "PUT",
        "data": {"groupRoles": ["GROUP_OWNER"]},
        "headers": {"Accept": "application/vnd.atlas.2025-03-12+json", "Content-Type": "application/json"}
      };
      await atlasUser.updateRoles("userId", {"groupRoles": ["GROUP_OWNER"]}, {"queryStringParam1": "value1", "httpOptions": {"options1": "value1"}});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/users/userId/roles?queryStringParam1=value1", {...requestParams, "options1": "value1"})).to.be.true();
    });
  });

  describe("When role action methods are called", () => {
    it("should add and remove a project role", async () => {
      const requestParams = {
        "digestAuth": "dummyPublicKey:dummyPrivateKey",
        "dataType": "json",
        "method": "POST",
        "data": {"groupRole": "GROUP_OWNER"},
        "headers": {"Accept": "application/vnd.atlas.2025-03-12+json", "Content-Type": "application/json"}
      };
      await atlasUser.addRole("userId", {"groupRole": "GROUP_OWNER"});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/users/userId:addRole?", requestParams)).to.be.true();
      await atlasUser.removeRole("userId", {"groupRole": "GROUP_OWNER"});
      expect(mockRequest.request.calledWith("dummyBaseUrl/groups/dummyProjectId/users/userId:removeRole?", requestParams)).to.be.true();
    });
  });

});
