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

describe("Mongo Atlas Api Client - User", () => {

  describe("When user is exported from index", () => {
    it("should export user functions", async () => {
      expect(client.user.get).to.be.function();
      expect(client.user.getAll).to.be.function();
      expect(client.user.create).to.be.function();
      expect(client.user.delete).to.be.function();
      expect(client.user.update).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/databaseUsers/admin/myUsername?key1=value1&key2=value2`)
        .reply(200, {"projectWhitelist": "name"});
      const result = await client.user.get("myUsername", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"projectWhitelist": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/databaseUsers?key1=value1&key2=value2`)
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.user.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .patch(`/groups/${projectId}/databaseUsers/admin/myUsername?key1=value1&key2=value2`)
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.user.update("myUsername", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/databaseUsers?key1=value1&key2=value2`)
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.user.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete(`/groups/${projectId}/databaseUsers/admin/myUsername?key1=value1&key2=value2`)
        .reply(200, true);
      const result = await client.user.delete("myUsername", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
