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

describe("Mongo Atlas Api Client - Project Accesslist", () => {

  describe("When projectAccesslist is exported from index", () => {
    it("should export projectAccesslist functions", async () => {
      expect(client.projectAccesslist.get).to.be.function();
      expect(client.projectAccesslist.getAll).to.be.function();
      expect(client.projectAccesslist.create).to.be.function();
      expect(client.projectAccesslist.delete).to.be.function();
      expect(client.projectAccesslist.update).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/accessList/myAccesslistEntry?key1=value1&key2=value2`)
        .reply(200, {"projectAccesslist": "name"});
      const result = await client.projectAccesslist.get("myAccesslistEntry", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"projectAccesslist": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/accessList?key1=value1&key2=value2`)
        .reply(200, [{"projectAccesslist": "name"}]);
      const result = await client.projectAccesslist.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectAccesslist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/accessList?key1=value1&key2=value2`)
        .reply(200, [{"projectAccesslist": "name"}]);
      const result = await client.projectAccesslist.update({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectAccesslist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post(`/groups/${projectId}/accessList?key1=value1&key2=value2`)
        .reply(200, [{"projectAccesslist": "name"}]);
      const result = await client.projectAccesslist.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectAccesslist": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete(`/groups/${projectId}/accessList/myAccesslistEntry?key1=value1&key2=value2`)
        .reply(200, true);
      const result = await client.projectAccesslist.delete("myAccesslistEntry", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
