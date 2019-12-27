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

  it("should export organization functions", async () => {
    expect(client.organization.getAllUsersForOrganization).to.be.function();
    expect(client.organization.getAll).to.be.function();
    expect(client.organization.getById).to.be.function();
    expect(client.organization.delete).to.be.function();
    expect(client.organization.getAllProjectsForOrganization).to.be.function();
    expect(client.organization.rename).to.be.function();
  });

});