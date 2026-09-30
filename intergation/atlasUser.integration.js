const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason} = require("./support");

describe("Atlas user integration", () => {

  it("should list users and get a listed user by id and username", {"skip": getSkipReason(), "timeout": 15000}, async () => {
    const client = createClient();
    const listedUsers = await client.atlasUser.getAll({"itemsPerPage": 1, "includeOrgUsers": true});
    expect(listedUsers.results).to.be.array();
    expect(listedUsers.results.length).to.be.above(0);

    const listedUser = listedUsers.results[0];
    const userById = await client.atlasUser.getById(listedUser.id);
    const userByUsername = await client.atlasUser.getByName(listedUser.username);

    expect(userById.id).to.equal(listedUser.id);
    expect(userByUsername.id).to.equal(listedUser.id);
    expect(userByUsername.username).to.equal(listedUser.username);
  });
});
