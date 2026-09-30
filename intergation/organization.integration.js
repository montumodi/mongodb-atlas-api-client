const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason} = require("./support");

describe("Organization integration", () => {

  it("should list organizations and read configured organization resources", {"skip": getSkipReason(), "timeout": 15000}, async () => {
    const client = createClient();
    const organizations = await client.organization.getAll({"itemsPerPage": 1});
    expect(organizations).to.exist();

    if (!process.env.ATLAS_TEST_ORG_ID) {
      return;
    }

    const organization = await client.organization.getById(process.env.ATLAS_TEST_ORG_ID);
    const users = await client.organization.getAllUsersForOrganization(process.env.ATLAS_TEST_ORG_ID, {"itemsPerPage": 1});
    const projects = await client.organization.getAllProjectsForOrganization(process.env.ATLAS_TEST_ORG_ID, {"itemsPerPage": 1});
    expect(organization).to.exist();
    expect(users).to.exist();
    expect(projects).to.exist();
  });
});
