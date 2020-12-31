const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const nock = require("nock");
const getClient = require("../src");

const baseUrl = "http://dummyBaseUrl";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl
});

describe("Mongo Atlas Api Client - Project", () => {

  describe("When project is exported from index", () => {
    it("should export project functions", async () => {
      expect(client.project.getById).to.be.function();
      expect(client.project.getByName).to.be.function();
      expect(client.project.getAll).to.be.function();
      expect(client.project.getTeamsByProjectId).to.be.function();
      expect(client.project.getByName).to.be.function();
      expect(client.project.delete).to.be.function();
      expect(client.project.removeUserFromProject).to.be.function();
      expect(client.project.assignTeams).to.be.function();
    });
  });

  describe("When getById is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/groups/projectId?key1=value1&key2=value2")
        .reply(200, {"project": "name"});
      const result = await client.project.getById("projectId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"project": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getByName is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/groups/byName/projectName?key1=value1&key2=value2")
        .reply(200, {"project": "name"});
      const result = await client.project.getByName("projectName", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"project": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getTeamsByProjectId is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/groups/projectId/teams?key1=value1&key2=value2")
        .reply(200, {"project": "name"});
      const result = await client.project.getTeamsByProjectId("projectId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"project": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/groups?key1=value1&key2=value2")
        .reply(200, [{"project": "name"}]);
      const result = await client.project.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"project": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When assignTeams is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post("/groups/projectId/teams?key1=value1&key2=value2")
        .reply(200, [{"project": "name"}]);
      const result = await client.project.assignTeams("projectId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"project": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post("/groups?key1=value1&key2=value2")
        .reply(200, [{"project": "name"}]);
      const result = await client.project.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"project": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete("/groups/projectId?key1=value1&key2=value2")
        .reply(200, true);
      const result = await client.project.delete("projectId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When removeUserFromProject is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete("/groups/projectId/users/userId?key1=value1&key2=value2")
        .reply(200, true);
      const result = await client.project.removeUserFromProject("projectId", "userId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
