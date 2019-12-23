const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");

describe("Mongo Client", () => {

  it("should require files", async () => {
    expect(true).to.be.true();
  });
});