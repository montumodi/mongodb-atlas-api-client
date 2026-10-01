const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason} = require("./support");

describe("Event integration", () => {

  it("should list project events and read configured project or organization events", {"skip": getSkipReason(), "timeout": 15000}, async () => {
    const client = createClient();
    const projectEvents = await client.event.getAll({"itemsPerPage": 1});
    expect(projectEvents).to.exist();

    if (process.env.ATLAS_TEST_EVENT_ID) {
      const projectEvent = await client.event.get(process.env.ATLAS_TEST_EVENT_ID);
      expect(projectEvent).to.exist();
    }

    if (process.env.ATLAS_TEST_ORG_ID) {
      const organizationEvents = await client.event.getAllByOrganizationId(process.env.ATLAS_TEST_ORG_ID, {"itemsPerPage": 1});
      expect(organizationEvents).to.exist();
    }
  });
});
