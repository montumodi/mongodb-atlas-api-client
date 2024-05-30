import getClient from "../src/index.js";

const {user, cluster} = getClient({
  "publicKey": "bbkqvmfi",
  "privateKey": "eaa96d94-9eb5-490e-97d6-25ccd912fd02",
  "baseUrl": "https://cloud.mongodb.com/api/atlas/v1.0",
  "projectId": "5e01271cc56c98243b3e6cef"
});

const result = await user.getAll();
console.log(result);

