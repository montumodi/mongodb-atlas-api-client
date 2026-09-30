const {describe, it, after} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason, parseJson, runCleanup} = require("./support");

const cleanups = [];

after(async () => {
  await runCleanup(cleanups);
});

describe("Project access-list integration", () => {

  it("should create, read, list, and delete an access-list entry", {"skip": getSkipReason("ATLAS_RUN_ACCESS_LIST_CRUD", "ATLAS_ACCESS_LIST_CREATE_BODY")}, async () => {
    if (process.env.ATLAS_RUN_ACCESS_LIST_CRUD !== "true") {
      return;
    }

    const client = createClient();
    const body = parseJson("ATLAS_ACCESS_LIST_CREATE_BODY");
    const created = await client.projectAccesslist.create(body);
    const entryValue = created.ipAddress || created.cidrBlock || created.awsSecurityGroup || body.ipAddress || body.cidrBlock || body.awsSecurityGroup;
    if (!entryValue) {
      throw new Error("The access-list create body or response must contain ipAddress, cidrBlock, or awsSecurityGroup.");
    }

    cleanups.push(() => client.projectAccesslist.delete(entryValue));
    const fetched = await client.projectAccesslist.get(entryValue);
    const listed = await client.projectAccesslist.getAll({"itemsPerPage": 1});

    expect(created).to.exist();
    expect(fetched).to.exist();
    expect(listed).to.exist();
  });
});
