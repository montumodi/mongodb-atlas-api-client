const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason} = require("./support");

describe("Alert integration", () => {

  it("should list alerts and get a configured alert", {"skip": getSkipReason(), "timeout": 15000}, async () => {
    const client = createClient();
    const alerts = await client.alert.getAll({"itemsPerPage": 1});
    expect(alerts).to.exist();

    if (process.env.ATLAS_TEST_ALERT_ID) {
      const alert = await client.alert.get(process.env.ATLAS_TEST_ALERT_ID);
      expect(alert).to.exist();
    }
  });
});
