const {describe, it, before} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const getClient = require("../src");

describe("Mongo Atlas Api Client", () => {
  let client;
  before(() => {
    client = getClient({
    "publicKey": "dummuyPublicKey",
    "privateKey": "dummyPrivateKey",
    "baseUrl": "baseUrl",
    "projectId": "dummyProjectId"
    });
  });

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