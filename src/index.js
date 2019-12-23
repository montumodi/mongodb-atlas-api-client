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
      "getUser" : user.getUser.bind(user),
      "getUsers": user.getUsers.bind(user),
      "deleteUser": user.deleteUser.bind(user),
      "createUser": user.createUser.bind(user),
      "updateUser": user.updateUser.bind(user)
    }
  }
}

module.exports = getMongodbAtlasApiClient;


