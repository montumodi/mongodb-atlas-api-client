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

  it("should export user functions", async () => {
    expect(client.user.get).to.be.function();
    expect(client.user.getAll).to.be.function();
    expect(client.user.create).to.be.function();
    expect(client.user.delete).to.be.function();
    expect(client.user.update).to.be.function();
  });
});