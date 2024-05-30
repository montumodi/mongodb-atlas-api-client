import {strict as assert} from "assert";
import {MockAgent, setGlobalDispatcher, request} from "urllib";

const baseUrl = "http://localhost:7001";
const projectId = "dummyProjectId";

const mockAgent = new MockAgent();
setGlobalDispatcher(mockAgent);

const mockPool = mockAgent.get(baseUrl);

const expectedRequest = mockPool.intercept({
  "path": `/groups/${projectId}/alerts/myAlertId?key1=value1&key2=value2`,
  "method": "get"
})
  .reply(200, {"alert": "name"});

console.log(mockPool);
const response = await request("http://localhost:7001/groups/dummyProjectId/alerts/myAlertId?key1=value1&key2=value2", {
  "method": "GET",
  "dataType": "json"
});
assert.equal(response.status, 200);
