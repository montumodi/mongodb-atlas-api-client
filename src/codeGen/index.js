const generateCode = require("./generator");

const input = [
  {
    "method": "GET",
    "functionName": "getAllContainersInProject",
    "url": "/groups/{GROUP-ID}/containers/all"
  },
  {
    "method": "GET",
    "functionName": "getAllContainersInCloudProvider",
    "url": "/groups/{GROUP-ID}/containers"
  },
  {
    "method": "GET",
    "functionName": "getContainerByContainerId",
    "url": "/groups/{GROUP-ID}/containers/{containerId}"
  },
  {
    "method": "GET",
    "functionName": "getAllPeeringsInProject",
    "url": "/groups/{GROUP-ID}/peers"
  },
  {
    "method": "GET",
    "functionName": "getPeeringByPeeringId",
    "url": "/groups/{GROUP-ID}/peers/{peerId}"
  },
  {
    "method": "GET",
    "functionName": "getPeeringOnlyMode",
    "url": "/groups/{GROUP-ID}/privateIpMode"
  },
  {
    "method": "POST",
    "functionName": "createContainer",
    "url": "/groups/{GROUP-ID}/containers"
  }

];

/* eslint-ignore no-console*/
console.log(generateCode("NetworkPeer", input));
