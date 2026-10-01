const {describe, it, after} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason, getUniqueName, parseJson, runCleanup} = require("./support");

const cleanups = [];

after(async () => {
  await runCleanup(cleanups);
});

describe("Custom database role integration", () => {

  it("should create, read, update, list, and delete a custom role", {"skip": getSkipReason("ATLAS_RUN_CUSTOM_ROLE_CRUD", "ATLAS_CUSTOM_ROLE_CREATE_BODY", "ATLAS_CUSTOM_ROLE_UPDATE_BODY")}, async () => {
    if (process.env.ATLAS_RUN_CUSTOM_ROLE_CRUD !== "true") {
      return;
    }

    const client = createClient();
    const roleName = getUniqueName("copilot-role");
    const createBody = parseJson("ATLAS_CUSTOM_ROLE_CREATE_BODY");
    const updateBody = parseJson("ATLAS_CUSTOM_ROLE_UPDATE_BODY");
    createBody.roleName = roleName;
    updateBody.roleName = roleName;

    const created = await client.customDbRole.create(createBody);
    cleanups.push(() => client.customDbRole.delete(roleName));
    const fetched = await client.customDbRole.get(roleName);
    const updated = await client.customDbRole.update(roleName, updateBody);
    const listed = await client.customDbRole.getAll({"itemsPerPage": 1});

    expect(created).to.exist();
    expect(fetched).to.exist();
    expect(updated).to.exist();
    expect(listed).to.exist();
  });
});
