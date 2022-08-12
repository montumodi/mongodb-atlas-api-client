const generateClass = require("./generator");
const fetchEndpointsList = require("./endpointsListFetcher");

(async() => {
  console.log(generateClass("NetworkPeer", await fetchEndpointsList("https://www.mongodb.com/docs/atlas/reference/api/clusters/")));
})();
