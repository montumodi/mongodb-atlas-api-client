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

  it("should export atlasUser functions", async () => {
    expect(client.atlasUser.getById).to.be.function();
    expect(client.atlasUser.getAll).to.be.function();
    expect(client.atlasUser.create).to.be.function();
    expect(client.atlasUser.getByName).to.be.function();
    expect(client.atlasUser.update).to.be.function();
  });

});