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

describe("Mongo Atlas Api Client - Custom Db Role", () => {

  describe("When customDbRole is exported from index", () => {
    it("should export customDbRole functions", async () => {
      expect(client.customDbRole.get).to.be.function();
      expect(client.customDbRole.getAll).to.be.function();
      expect(client.customDbRole.create).to.be.function();
      expect(client.customDbRole.delete).to.be.function();
      expect(client.customDbRole.update).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/customDBRoles/roles/rolename?key1=value1&key2=value2`)
        .reply(200, {"customDbRole": "name"});
      const result = await client.customDbRole.get("rolename", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"customDbRole": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/customDBRoles/roles?key1=value1&key2=value2`)
        .reply(200, [{"customDbRole": "name"}]);
      const result = await client.customDbRole.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"customDbRole": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .patch(`/groups/${projectId}/customDBRoles/roles/rolename?key1=value1&key2=value2`)
        .reply(200, [{"customDbRole": "name"}]);
      const result = await client.customDbRole.update("rolename", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"customDbRole": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete(`/groups/${projectId}/customDBRoles/roles/rolename?key1=value1&key2=value2`)
        .reply(200, true);
      const result = await client.customDbRole.delete("rolename", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/customDBRoles/roles?key1=value1&key2=value2`)
        .reply(200, [{"customDbRole": "name"}]);
      const result = await client.customDbRole.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"customDbRole": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
