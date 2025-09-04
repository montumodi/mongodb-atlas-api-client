const {describe, it, afterEach, before, beforeEach} = exports.lab = require("@hapi/lab").script();
const {expect} = require('@hapi/code');
const getClient = require('../src/index.js');
const HttpClient = require('../src/httpClient.js');
const {stub} = require("sinon");
const {MockAgent, setGlobalDispatcher} = require('urllib');

const baseUrl = "http://localhost:7001";
const projectId = "dummyProjectId";

describe("Mongo Atlas Api Client - Headers Support", () => {

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

  describe("When client is created with custom headers", () => {

    it("should include custom headers in requests", async () => {
      const customHeaders = {"Accept": "application/vnd.atlas.2025-03-12+json"};
      const client = getClient({
        "publicKey": "dummuyPublicKey",
        "privateKey": "dummyPrivateKey",
        "baseUrl": baseUrl,
        "projectId": projectId,
        "headers": customHeaders
      });

      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers/admin/myUsername?key1=value1`,
        "method": "get",
        "headers": {
          "Accept": "application/vnd.atlas.2025-03-12+json"
        }
      })
        .reply(200, {"user": "data"});

      const result = await client.user.get("myUsername", {"key1": "value1"});
      expect(result).to.equal({"user": "data"});
    });

    it("should work with empty headers object", async () => {
      const client = getClient({
        "publicKey": "dummuyPublicKey",
        "privateKey": "dummyPrivateKey",
        "baseUrl": baseUrl,
        "projectId": projectId,
        "headers": {}
      });

      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers/admin/myUsername`,
        "method": "get"
      })
        .reply(200, {"user": "data"});

      const result = await client.user.get("myUsername");
      expect(result).to.equal({"user": "data"});
    });

    it("should work without headers property", async () => {
      const client = getClient({
        "publicKey": "dummuyPublicKey",
        "privateKey": "dummyPrivateKey",
        "baseUrl": baseUrl,
        "projectId": projectId
      });

      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers/admin/myUsername`,
        "method": "get"
      })
        .reply(200, {"user": "data"});

      const result = await client.user.get("myUsername");
      expect(result).to.equal({"user": "data"});
    });

    it("should merge custom headers with method-specific headers", async () => {
      const customHeaders = {"Accept": "application/vnd.atlas.2025-03-12+json"};
      const client = getClient({
        "publicKey": "dummuyPublicKey",
        "privateKey": "dummyPrivateKey",
        "baseUrl": baseUrl,
        "projectId": projectId,
        "headers": customHeaders
      });

      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers?key1=value1`,
        "method": "POST",
        "data": {"username": "testUser"},
        "headers": {
          "Accept": "application/vnd.atlas.2025-03-12+json",
          "Content-Type": "application/json"
        }
      })
        .reply(200, {"user": "created"});

      const result = await client.user.create({"username": "testUser"}, {"key1": "value1"});
      expect(result).to.equal({"user": "created"});
    });

    it("should merge custom headers with httpOptions headers", async () => {
      const customHeaders = {"Accept": "application/vnd.atlas.2025-03-12+json"};
      const client = getClient({
        "publicKey": "dummuyPublicKey",
        "privateKey": "dummyPrivateKey",
        "baseUrl": baseUrl,
        "projectId": projectId,
        "headers": customHeaders
      });

      mockPool.intercept({
        "path": `/groups/${projectId}/databaseUsers/admin/myUsername?key1=value1`,
        "method": "get",
        "headers": {
          "Accept": "application/vnd.atlas.2025-03-12+json",
          "Custom-Header": "custom-value"
        }
      })
        .reply(200, {"user": "data"});

      const result = await client.user.get("myUsername", {
        "key1": "value1",
        "httpOptions": {
          "headers": {
            "Custom-Header": "custom-value"
          }
        }
      });
      expect(result).to.equal({"user": "data"});
    });
  });
});

describe("HttpClient Direct Tests", () => {
  const mockRequest = {
    "request": stub().returns(new Promise(resolve => resolve({"data": "test data"})))
  };

  it("should handle headers merging properly", async () => {
    const httpClient = new HttpClient(mockRequest, "publicKey", "privateKey", {"Default-Header": "default-value"});
    
    await httpClient.fetch("test-url", {
      "headers": {
        "Custom-Header": "custom-value"
      }
    });

    const expectedParams = {
      "digestAuth": "publicKey:privateKey",
      "dataType": "json",
      "headers": {
        "Default-Header": "default-value",
        "Custom-Header": "custom-value"
      }
    };

    expect(mockRequest.request.calledWith("test-url", expectedParams)).to.be.true();
  });
});