const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require('@hapi/code');
const HttpClient = require('../src/httpClient.js');
const {stub} = require("sinon");

describe("HttpClient Coverage Tests", () => {
  const mockRequest = {
    "request": stub().returns(new Promise(resolve => resolve({"data": "test data"})))
  };

  it("should cover fetchStream with header merging", async () => {
    const httpClient = new HttpClient(mockRequest, "publicKey", "privateKey", {"Default-Header": "default-value"});
    
    await httpClient.fetchStream("test-url", {
      "headers": {
        "Custom-Header": "custom-value"
      }
    });

    const expectedParams = {
      "digestAuth": "publicKey:privateKey",
      "streaming": true,
      "headers": {
        "Default-Header": "default-value",
        "Custom-Header": "custom-value"
      }
    };

    expect(mockRequest.request.calledWith("test-url", expectedParams)).to.be.true();
  });
});