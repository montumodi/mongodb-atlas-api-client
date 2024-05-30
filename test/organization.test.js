import {script} from "@hapi/lab";
export const lab = script();
const {describe, it, afterEach, before, beforeEach} = lab;
import {expect} from "@hapi/code";
import getClient from "../src/index.js";

import {MockAgent, setGlobalDispatcher} from "urllib";

const baseUrl = "http://localhost:7001";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl
});

describe("Mongo Atlas Api Client - Organization", () => {

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
      mockPool.intercept({
        "path": "/orgs/orgName",
        "query": {"key1": "value1", "key2": "value2"},
        "method": "GET"
      }).reply(200, {"organization": "name"});
      const result = await client.organization.getById("orgName", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"organization": "name"});

    });
  });

  describe("When getAllUsersForOrganization is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/orgs/orgId/users?key1=value1&key2=value2",
        "method": "GET"
      })
        .reply(200, {"organization": "name"});
      const result = await client.organization.getAllUsersForOrganization("orgId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"organization": "name"});

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/orgs?key1=value1&key2=value2",
        "method": "GET"
      })
        .reply(200, [{"organization": "name"}]);
      const result = await client.organization.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"organization": "name"}]);

    });
  });

  describe("When rename is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/orgs/orgId?key1=value1&key2=value2",
        "method": "PATCH",
        "body": {"body": "value"}
      })
        .reply(200, [{"organization": "name"}]);
      const result = await client.organization.rename("orgId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"organization": "name"}]);

    });
  });

  describe("When getAllProjectsForOrganization is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/orgs/orgId/groups?key1=value1&key2=value2",
        "method": "GET"
      })
        .reply(200, [{"organization": "name"}]);
      const result = await client.organization.getAllProjectsForOrganization("orgId", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"organization": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/orgs/orgId?key1=value1&key2=value2",
        "method": "DELETE"
      })
        .reply(200, true);
      const result = await client.organization.delete("orgId", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });

  describe("When invite is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": "/orgs/orgId/invites?key1=value1&key2=value2",
        "method": "POST",
        "body": {"body": "value"}
      })
        .reply(200, [{"organization": "name"}]);
      const result = await client.organization.invite("orgId", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"organization": "name"}]);

    });
  });
});
