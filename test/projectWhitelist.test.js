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

  it("should export projectWhitelist functions", async () => {
    expect(client.projectWhitelist.get).to.be.function();
    expect(client.projectWhitelist.getAll).to.be.function();
    expect(client.projectWhitelist.create).to.be.function();
    expect(client.projectWhitelist.delete).to.be.function();
    expect(client.projectWhitelist.update).to.be.function();
  });

});