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

describe("Mongo Atlas Api Client - Cluster", () => {

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

  describe("When cluster is exported from index", () => {
    it("should export cluster functions", async () => {
      expect(client.cluster.get).to.be.function();
      expect(client.cluster.getAll).to.be.function();
      expect(client.cluster.create).to.be.function();
      expect(client.cluster.delete).to.be.function();
      expect(client.cluster.update).to.be.function();
      expect(client.cluster.updateAdvanceConfiguration).to.be.function();
      expect(client.cluster.testPrimaryFailOver).to.be.function();
      expect(client.cluster.getAdvanceConfiguration).to.be.function();
    });
  });

  describe("When get is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"cluster": "name"});
      const result = await client.cluster.get("mycluster", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"cluster": "name"});

    });
  });

  describe("When getAdvanceConfiguration is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/processArgs?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, {"cluster": "name"});
      const result = await client.cluster.getAdvanceConfiguration("mycluster", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal({"cluster": "name"});

    });
  });

  describe("When getAll is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters?key1=value1&key2=value2`,
        "method": "get"
      })
        .reply(200, [{"cluster": "name"}]);
      const result = await client.cluster.getAll({"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cluster": "name"}]);

    });
  });

  describe("When update is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/myCluster?key1=value1&key2=value2`,
        "method": "patch",
        "body": {"body": "value"}
      })
        .reply(200, [{"cluster": "name"}]);
      const result = await client.cluster.update("myCluster", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cluster": "name"}]);

    });
  });

  describe("When updateAdvanceConfiguration is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/myCluster/processArgs?key1=value1&key2=value2`,
        "method": "patch",
        "body": {"body": "value"}
      })
        .reply(200, [{"cluster": "name"}]);
      const result = await client.cluster.updateAdvanceConfiguration("myCluster", {"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cluster": "name"}]);

    });
  });

  describe("When create is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters?key1=value1&key2=value2`,
        "method": "post",
        "body": {"body": "value"}
      })
        .reply(200, [{"cluster": "name"}]);
      const result = await client.cluster.create({"body": "value"}, {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cluster": "name"}]);

    });
  });

  describe("When testPrimaryFailOver is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster/restartPrimaries?key1=value1&key2=value2`,
        "method": "post",
        "body": {"body": "value"}
      })
        .reply(200, [{"cluster": "name"}]);
      const result = await client.cluster.testPrimaryFailOver("mycluster", {"key1": "value1", "key2": "value2"});
      expect(result).to.equal([{"cluster": "name"}]);

    });
  });

  describe("When delete is called with querystring parameters", () => {
    it("should return response", async () => {
      mockPool.intercept({
        "path": `/groups/${projectId}/clusters/mycluster?key1=value1&key2=value2`,
        "method": "delete"
      })
        .reply(200, true);
      const result = await client.cluster.delete("mycluster", {"key1": "value1", "key2": "value2"});
      expect(result).to.be.true();

    });
  });
});
