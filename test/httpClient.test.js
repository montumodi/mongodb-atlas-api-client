const {describe, it} = exports.lab = require("@hapi/lab").script();
const {expect} = require('@hapi/code');
const {Readable} = require("stream");
const {stub} = require("sinon");
const HttpClient = require("../src/httpClient.js");

describe("HttpClient", () => {

  it("should pass digest authentication and JSON settings to requests", async () => {
    const request = stub().resolves({"data": {"result": "value"}});
    const client = new HttpClient({request}, "publicKey", "privateKey");
    const response = await client.fetch("https://example.test/resource", {"timeout": 1000});
    expect(response).to.equal({"result": "value"});
    expect(request.calledOnce).to.be.true();
    expect(request.calledWith("https://example.test/resource", {
      "digestAuth": "publicKey:privateKey",
      "dataType": "json",
      "headers": {"Accept": "application/vnd.atlas.2025-03-12+json"},
      "timeout": 1000
    })).to.be.true();
  });

  it("should propagate request failures", async () => {
    const requestError = new Error("request failed");
    const request = stub().rejects(requestError);
    const client = new HttpClient({request}, "publicKey", "privateKey");
    let error;
    try {
      await client.fetch("https://example.test/resource");
    } catch (caughtError) {
      error = caughtError;
    }
    expect(error).to.equal(requestError);
  });

  it("should return the streaming response", async () => {
    const stream = Readable.from(["stream data"]);
    const request = stub().resolves({"res": stream});
    const client = new HttpClient({request}, "publicKey", "privateKey", "2025-03-12");
    const response = await client.fetchStream("https://example.test/resource", {"gzip": true});
    const chunks = [];
    for await (const chunk of response) {
      chunks.push(chunk);
    }
    expect(chunks.join("")).to.equal("stream data");
    expect(request.calledWith("https://example.test/resource", {
      "digestAuth": "publicKey:privateKey",
      "streaming": true,
      "headers": {"Accept": "application/vnd.atlas.2025-03-12+json"},
      "gzip": true
    })).to.be.true();
  });

  it("should allow callers to select a resource version", async () => {
    const request = stub().resolves({"data": {}});
    const client = new HttpClient({request}, "publicKey", "privateKey", "2026-01-01");
    await client.fetch("https://example.test/resource", {"headers": {"X-Request-Id": "requestId"}});
    expect(request.calledWith("https://example.test/resource", {
      "digestAuth": "publicKey:privateKey",
      "dataType": "json",
      "headers": {
        "Accept": "application/vnd.atlas.2026-01-01+json",
        "X-Request-Id": "requestId"
      }
    })).to.be.true();
  });

  it("should provide response metadata to the configured callback", async () => {
    const onResponse = stub();
    const request = stub().resolves({
      "data": {},
      "headers": {"deprecation": "Wed, 1 Feb 2023 00:00:00 GMT", "sunset": "Sun, 1 Jun 2025 00:00:00 GMT"},
      "status": 200
    });
    const client = new HttpClient({request}, "publicKey", "privateKey", "2025-03-12", onResponse);
    await client.fetch("https://example.test/resource");
    expect(onResponse.calledWith({
      "headers": {"deprecation": "Wed, 1 Feb 2023 00:00:00 GMT", "sunset": "Sun, 1 Jun 2025 00:00:00 GMT"},
      "status": 200
    })).to.be.true();
  });
});