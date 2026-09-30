const {describe, it, after} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason, getUniqueName, parseJson, runCleanup} = require("./support");

const cleanups = [];

after(async () => {
  await runCleanup(cleanups);
});

describe("Database user integration", () => {

  it("should create, read, update, list, and delete an admin database user", {"skip": getSkipReason("ATLAS_RUN_DATABASE_USER_CRUD", "ATLAS_DATABASE_USER_CREATE_BODY", "ATLAS_DATABASE_USER_UPDATE_BODY")}, async () => {
    if (process.env.ATLAS_RUN_DATABASE_USER_CRUD !== "true") {
      return;
    }

    const client = createClient();
    const username = getUniqueName("copilot-user");
    const createBody = parseJson("ATLAS_DATABASE_USER_CREATE_BODY");
    const updateBody = parseJson("ATLAS_DATABASE_USER_UPDATE_BODY");
    createBody.username = username;
    createBody.databaseName = "admin";

    const created = await client.user.create(createBody);
    cleanups.push(() => client.user.delete(username));
    const fetched = await client.user.get(username);
    const updated = await client.user.update(username, updateBody);
    const listed = await client.user.getAll({"itemsPerPage": 1});

    expect(created).to.exist();
    expect(fetched).to.exist();
    expect(updated).to.exist();
    expect(listed).to.exist();
  });
});
