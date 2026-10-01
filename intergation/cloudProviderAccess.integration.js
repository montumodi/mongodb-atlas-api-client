const {describe, it, after} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason, parseJson, runCleanup} = require("./support");

const cleanups = [];

after(async () => {
  await runCleanup(cleanups);
});

describe("Cloud provider access integration", () => {

  it("should list cloud provider access roles", {"skip": getSkipReason()}, async () => {
    const result = await createClient().cloudProviderAccess.getAll({"itemsPerPage": 1});
    expect(result).to.exist();
  });

  it("should create, update, and delete a cloud provider access role", {"skip": getSkipReason("ATLAS_RUN_CLOUD_PROVIDER_ACCESS_CRUD", "ATLAS_CLOUD_PROVIDER_ACCESS_CREATE_BODY", "ATLAS_CLOUD_PROVIDER_ACCESS_UPDATE_BODY", "ATLAS_CLOUD_PROVIDER")}, async () => {
    if (process.env.ATLAS_RUN_CLOUD_PROVIDER_ACCESS_CRUD !== "true") {
      return;
    }

    const client = createClient();
    const created = await client.cloudProviderAccess.create(parseJson("ATLAS_CLOUD_PROVIDER_ACCESS_CREATE_BODY"));
    if (!created.roleId) {
      throw new Error("Cloud provider access create response did not contain roleId.");
    }

    cleanups.push(() => client.cloudProviderAccess.delete(process.env.ATLAS_CLOUD_PROVIDER, created.roleId));
    const updated = await client.cloudProviderAccess.update(created.roleId, parseJson("ATLAS_CLOUD_PROVIDER_ACCESS_UPDATE_BODY"));

    expect(created).to.exist();
    expect(updated).to.exist();
  });
});
