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

describe("Mongo Atlas Api Client - Organization", () => {

  describe("When organization is exported from index", () => {
    it("should export organization functions", async () => {
      expect(client.organization.getById).to.be.function();
      expect(client.organization.getAll).to.be.function();
      expect(client.organization.delete).to.be.function();
      expect(client.organization.rename).to.be.function();
      expect(client.organization.getAllUsersForOrganization).to.be.function();
      expect(client.organization.getAllProjectsForOrganization).to.be.function();
      expect(client.organization.invite).to.be.function();
    });
  });

  describe("When getById is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/orgs/orgName?key1=value1&key2=value2")
        .reply(200, {"organization": "name"});
      const result = await client.organization.getById("orgName", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"organization": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAllUsersForOrganization is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/orgs/orgId/users?key1=value1&key2=value2")
        .reply(200, {"organization": "name"});
      const result = await client.organization.getAllUsersForOrganization("orgId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"organization": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/orgs?key1=value1&key2=value2")
        .reply(200, [{"organization": "name"}]);
      const result = await client.organization.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"organization": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When rename is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .patch("/orgs/orgId?key1=value1&key2=value2")
        .reply(200, [{"organization": "name"}]);
      const result = await client.organization.rename("orgId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"organization": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAllProjectsForOrganization is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/orgs/orgId/groups?key1=value1&key2=value2")
        .reply(200, [{"organization": "name"}]);
      const result = await client.organization.getAllProjectsForOrganization("orgId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"organization": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .delete("/orgs/orgId?key1=value1&key2=value2")
        .reply(200, true);
      const result = await client.organization.delete("orgId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When invite is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .post("/orgs/orgId/invites?key1=value1&key2=value2")
        .reply(200, [{"organization": "name"}]);
      const result = await client.organization.invite("orgId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"organization": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
