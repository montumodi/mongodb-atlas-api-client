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

describe("Mongo Atlas Api Client - Event", () => {

  describe("When event is exported from index", () => {
    it("should export event functions", async () => {
      expect(client.event.get).to.be.function();
      expect(client.event.getAll).to.be.function();
      expect(client.event.getAllByOrganizationId).to.be.function();
      expect(client.event.getByOrganizationId).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/events/myeventId?key1=value1&key2=value2`)
        .reply(200, {"event": "name"});
      const result = await client.event.get("myeventId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"event": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get(`/groups/${projectId}/events?key1=value1&key2=value2`)
        .reply(200, [{"event": "name"}]);
      const result = await client.event.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"event": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getByOrganizationId is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/orgs/myOrgId/events/myeventId?key1=value1&key2=value2")
        .reply(200, {"event": "name"});
      const result = await client.event.getByOrganizationId("myOrgId", "myeventId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"event": "name"});
      expect(expectedRequest.isDone()).to.be.true();
    });
  });

  describe("When getAllByOrganizationId is called with querystring parameters", () => {
    it("should return response", async () => {
      const expectedRequest = nock(baseUrl)
        .get("/orgs/myOrgId/events?key1=value1&key2=value2")
        .reply(200, [{"event": "name"}]);
      const result = await client.event.getAllByOrganizationId("myOrgId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"event": "name"}]);
      expect(expectedRequest.isDone()).to.be.true();
    });
  });
});
