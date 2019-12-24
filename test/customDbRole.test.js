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

  it("should export customDbRole functions", async () => {
    expect(client.customDbRole.get).to.be.function();
    expect(client.customDbRole.getAll).to.be.function();
    expect(client.customDbRole.create).to.be.function();
    expect(client.customDbRole.delete).to.be.function();
    expect(client.customDbRole.update).to.be.function();
  });

});