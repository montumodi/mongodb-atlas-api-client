const User = require("./user");
const DigestFetch = require("digest-fetch");

function getMongodbAtlasApiClient(options) {
  const client = new DigestFetch(
    options.publicKey,
    options.privateKey,
    {}
  );
  const user = new User(client, options.baseUrl, options.projectId);
  return {
    "user": {
      "get" : user.get.bind(user),
      "getAll": user.getAll.bind(user),
      "delete": user.delete.bind(user),
      "create": user.create.bind(user),
      "update": user.update.bind(user)
    }
  }
}

module.exports = getMongodbAtlasApiClient;


