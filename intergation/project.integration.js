const {describe, it, after} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason, getUniqueName, runCleanup} = require("./support");

const cleanups = [];

after(async () => {
  await runCleanup(cleanups);
});

describe("Project integration", () => {

  it("should list projects and read a configured project and its teams", {"skip": getSkipReason(), "timeout": 15000}, async () => {
    const client = createClient();
    const projects = await client.project.getAll({"itemsPerPage": 1});
    expect(projects).to.exist();

    if (!process.env.ATLAS_TEST_PROJECT_NAME) {
      return;
    }

    const byName = await client.project.getByName(process.env.ATLAS_TEST_PROJECT_NAME);
    const byId = await client.project.getById(process.env.ATLAS_PROJECT_ID);
    const teams = await client.project.getTeamsByProjectId(process.env.ATLAS_PROJECT_ID);
    expect(byName).to.exist();
    expect(byId).to.exist();
    expect(teams).to.exist();
  });

  it("should create, read, and delete a disposable project", {"skip": getSkipReason("ATLAS_RUN_PROJECT_CRUD", "ATLAS_PROJECT_ORG_ID")}, async () => {
    if (process.env.ATLAS_RUN_PROJECT_CRUD !== "true") {
      return;
    }

    const client = createClient();
    const name = getUniqueName("copilot-project");
    const created = await client.project.create({"name": name, "orgId": process.env.ATLAS_PROJECT_ORG_ID});
    cleanups.push(() => client.project.delete(created.id));
    const byId = await client.project.getById(created.id);
    const byName = await client.project.getByName(name);

    expect(created.id).to.exist();
    expect(byId).to.exist();
    expect(byName).to.exist();
  });
});
