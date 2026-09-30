const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason} = require("./support");

describe("Atlas integration configuration", () => {

  it("should create a v2 client from the configured credentials", {"skip": getSkipReason()}, () => {
    const client = createClient();
    expect(client.cluster.getAll).to.be.function();
  });
});
