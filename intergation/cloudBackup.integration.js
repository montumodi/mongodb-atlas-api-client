const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require("@hapi/code");
const {createClient, getSkipReason} = require("./support");

describe("Cloud backup integration", () => {

  it("should list backups and read configured snapshots or restore jobs", {"skip": getSkipReason("ATLAS_TEST_CLUSTER_NAME"), "timeout": 15000}, async () => {
    const client = createClient();
    const clusterName = process.env.ATLAS_TEST_CLUSTER_NAME;
    const backups = await client.cloudBackup.getAllReplicaSetCloudBackups(clusterName, {"itemsPerPage": 1});
    expect(backups).to.exist();

    if (process.env.ATLAS_TEST_SNAPSHOT_ID) {
      const snapshot = await client.cloudBackup.getReplicaSetCloudBackup(clusterName, process.env.ATLAS_TEST_SNAPSHOT_ID);
      expect(snapshot).to.exist();
    }

    if (process.env.ATLAS_TEST_RESTORE_JOB_ID) {
      const restoreJob = await client.cloudBackup.getSnapshotRestoreJob(clusterName, process.env.ATLAS_TEST_RESTORE_JOB_ID);
      expect(restoreJob).to.exist();
    }
  });
});
