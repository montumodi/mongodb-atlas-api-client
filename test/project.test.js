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

  it("should export project functions", async () => {
    expect(client.project.getById).to.be.function();
    expect(client.project.getByName).to.be.function();
    expect(client.project.getAll).to.be.function();
    expect(client.project.getTeamsByProjectId).to.be.function();
    expect(client.project.create).to.be.function();
    expect(client.project.assignTeams).to.be.function();
    expect(client.project.delete).to.be.function();
    expect(client.project.removeUserFromProject).to.be.function();
  });

});