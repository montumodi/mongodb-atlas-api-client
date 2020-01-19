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

describe("Mongo Atlas Api Client - Project Whitelist", () => {

  describe("When projectWhitelist is exported from index", () => {
    it("should export projectWhitelist functions", async () => {
      expect(client.projectWhitelist.get).to.be.function();
      expect(client.projectWhitelist.getAll).to.be.function();
      expect(client.projectWhitelist.create).to.be.function();
      expect(client.projectWhitelist.delete).to.be.function();
      expect(client.projectWhitelist.update).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/whitelist/myWhitelistEntry?key1=value1&key2=value2`)
        .reply(200, {"projectWhitelist": "name"});
      const result = await client.projectWhitelist.get("myWhitelistEntry", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"projectWhitelist": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/whitelist?key1=value1&key2=value2`)
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.projectWhitelist.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/whitelist?key1=value1&key2=value2`)
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.projectWhitelist.update({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/whitelist?key1=value1&key2=value2`)
        .reply(200, [{"projectWhitelist": "name"}]);
      const result = await client.projectWhitelist.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectWhitelist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete(`/groups/${projectId}/whitelist/myWhitelistEntry?key1=value1&key2=value2`)
        .reply(200, true);
      const result = await client.projectWhitelist.delete("myWhitelistEntry", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
