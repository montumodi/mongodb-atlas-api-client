const User = require("./user");
const Cluster = require("./cluster");
const CustomDbRole = require("./customDbRole");
const DigestFetch = require("digest-fetch");

function getMongodbAtlasApiClient(options) {
  const client = new DigestFetch(
    options.publicKey,
    options.privateKey,
    {}
  );
  const user = new User(client, options.baseUrl, options.projectId);
  const cluster = new Cluster(client, options.baseUrl, options.projectId);
  const customDbRole = new CustomDbRole(client, options.baseUrl, options.projectId);

  return {
    "user": {
      "get" : user.get.bind(user),
      "getAll": user.getAll.bind(user),
      "delete": user.delete.bind(user),
      "create": user.create.bind(user),
      "update": user.update.bind(user)
    },
    "customDbRole": {
      "get" : customDbRole.get.bind(customDbRole),
      "getAll": customDbRole.getAll.bind(customDbRole),
      "delete": customDbRole.delete.bind(customDbRole),
      "create": customDbRole.create.bind(customDbRole),
      "update": customDbRole.update.bind(customDbRole)
    },
    "cluster": {
      "get" : cluster.get.bind(cluster),
      "getAdvanceConfiguration": cluster.getAdvanceConfiguration.bind(cluster),
      "getAll": cluster.getAll.bind(cluster),
      "delete": cluster.delete.bind(cluster),
      "create": cluster.create.bind(cluster),
      "update": cluster.update.bind(cluster),
      "updateAdvanceConfiguration": cluster.updateAdvanceConfiguration.bind(cluster),
      "testPrimaryFailOver": cluster.testPrimaryFailOver.bind(cluster)
    }
  }
}

module.exports = getMongodbAtlasApiClient;


