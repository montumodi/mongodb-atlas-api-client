import {script} from "@hapi/lab";
export const lab = script();
const {describe, it, afterEach, before, beforeEach} = lab;
import {expect} from "@hapi/code";
import getClient from "../src/index.js";

import {MockAgent, setGlobalDispatcher} from "urllib";

const baseUrl = "http://localhost:7001";
const projectId = "dummyProjectId";

const client = getClient({
  "publicKey": "dummuyPublicKey",
  "privateKey": "dummyPrivateKey",
  "baseUrl": baseUrl,
  "projectId": projectId
});

describe("Mongo Atlas Api Client - Project Accesslist", () => {

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
      mockPool.intercept({
        "path": `/groups/${projectId}/accessList/myAccesslistEntry?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"projectAccesslist": "name"});
      const result = await client.projectAccesslist.get("myAccesslistEntry", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"projectAccesslist": "name"});

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/accessList?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"projectAccesslist": "name"}]);
      const result = await client.projectAccesslist.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectAccesslist": "name"}]);

    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/accessList?key1=value1&key2=value2`,
        "method": "PATCH",
        "body": {"body": "value"}
      })
        .reply(200, [{"projectAccesslist": "name"}]);
      const result = await client.projectAccesslist.update({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectAccesslist": "name"}]);

    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/accessList?key1=value1&key2=value2`,
        "method": "POST",
        "body": {"body": "value"}
      })
        .reply(200, [{"projectAccesslist": "name"}]);
      const result = await client.projectAccesslist.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"projectAccesslist": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/accessList/myAccesslistEntry?key1=value1&key2=value2`,
        "method": "DELETE"
      })
        .reply(200, true);
      const result = await client.projectAccesslist.delete("myAccesslistEntry", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });
});
