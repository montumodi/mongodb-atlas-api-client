const {describe, it, after} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason, getUniqueName, parseJson, runCleanup} = require("./support");

const cleanups = [];

after(async () => {
  await runCleanup(cleanups);
});

describe("Atlas Search integration", () => {

  it("should list search indexes for a configured collection", {"skip": getSkipReason("ATLAS_TEST_CLUSTER_NAME", "ATLAS_SEARCH_DATABASE", "ATLAS_SEARCH_COLLECTION")}, async () => {
    const result = await createClient().atlasSearch.getAll(process.env.ATLAS_TEST_CLUSTER_NAME, process.env.ATLAS_SEARCH_DATABASE, process.env.ATLAS_SEARCH_COLLECTION);
    expect(result).to.exist();
  });

  it("should create, read, update, and delete a search index", {"skip": getSkipReason("ATLAS_RUN_SEARCH_INDEX_CRUD", "ATLAS_TEST_CLUSTER_NAME", "ATLAS_SEARCH_CREATE_BODY", "ATLAS_SEARCH_UPDATE_BODY")}, async () => {
    if (process.env.ATLAS_RUN_SEARCH_INDEX_CRUD !== "true") {
      return;
    }

    const client = createClient();
    const body = parseJson("ATLAS_SEARCH_CREATE_BODY");
    const updateBody = parseJson("ATLAS_SEARCH_UPDATE_BODY");
    body.name = getUniqueName("copilot-search");
    const created = await client.atlasSearch.create(process.env.ATLAS_TEST_CLUSTER_NAME, body);
    const indexId = created.indexId || created.name || body.name;
    cleanups.push(() => client.atlasSearch.delete(process.env.ATLAS_TEST_CLUSTER_NAME, indexId));
    const fetched = await client.atlasSearch.get(process.env.ATLAS_TEST_CLUSTER_NAME, indexId);
    const updated = await client.atlasSearch.update(process.env.ATLAS_TEST_CLUSTER_NAME, indexId, updateBody);

    expect(created).to.exist();
    expect(fetched).to.exist();
    expect(updated).to.exist();
  });
});
