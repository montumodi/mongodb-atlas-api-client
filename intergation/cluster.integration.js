const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason} = require("./support");

describe("Cluster integration", () => {

  it("should list clusters and read a configured cluster", {"skip": getSkipReason(), "timeout": 15000}, async () => {
    const client = createClient();
    const result = await client.cluster.getAll({"itemsPerPage": 1});
    expect(result.results).to.be.array();

    if (result.results.length > 0) {
      const cluster = result.results[0];
      expect(typeof cluster.name).to.equal("string");
      expect(typeof cluster.id).to.equal("string");
      expect(typeof cluster.groupId).to.equal("string");
      expect(typeof cluster.backupEnabled).to.equal("boolean");
      expect(typeof cluster.retainBackups).to.equal("boolean");
      expect(typeof cluster.rootCertType).to.equal("string");
      expect(typeof cluster.terminationProtectionEnabled).to.equal("boolean");
      expect(typeof cluster.useAwsTimeBasedSnapshotCopyForFastInitialSync).to.equal("boolean");
      expect(typeof cluster.versionReleaseSystem).to.equal("string");
    }

    if (!process.env.ATLAS_TEST_CLUSTER_NAME) {
      return;
    }

    const cluster = await client.cluster.get(process.env.ATLAS_TEST_CLUSTER_NAME);
    const advancedConfiguration = await client.cluster.getAdvanceConfiguration(process.env.ATLAS_TEST_CLUSTER_NAME);
    expect(cluster.name).to.equal(process.env.ATLAS_TEST_CLUSTER_NAME);
    expect(typeof cluster.id).to.equal("string");
    expect(typeof cluster.groupId).to.equal("string");
    expect(typeof cluster.backupEnabled).to.equal("boolean");
    expect(typeof cluster.retainBackups).to.equal("boolean");
    expect(typeof cluster.rootCertType).to.equal("string");
    expect(typeof cluster.terminationProtectionEnabled).to.equal("boolean");
    expect(typeof cluster.useAwsTimeBasedSnapshotCopyForFastInitialSync).to.equal("boolean");
    expect(typeof cluster.versionReleaseSystem).to.equal("string");
    expect(advancedConfiguration).to.be.object();
  });
});
