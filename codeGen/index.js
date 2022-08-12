const generateClass = require("./generator");
const fetchEndpointsList = require("./endpointsListFetcher");
const fs = require("fs").promises;

(async () => {
  await fs.writeFile("./src/networkPeer.js", generateClass("NetworkPeer", await fetchEndpointsList("https://www.mongodb.com/docs/atlas/reference/api/vpc/")));
})();
