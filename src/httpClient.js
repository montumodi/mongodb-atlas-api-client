class HttpClient {
  constructor(client, publicKey, privateKey, apiVersion = "2025-03-12", onResponse) {
    this.client_ = client;
    this.digestAuth_ = `${publicKey}:${privateKey}`;
    this.accept_ = `application/vnd.atlas.${apiVersion}+json`;
    this.onResponse_ = onResponse;
  }

  async fetch(url, options = {}) {
    const {headers, ...requestOptions} = options;
    const response = await this.client_.request(url, {
      "digestAuth": this.digestAuth_,
      "dataType": "json",
      "headers": {"Accept": this.accept_, ...headers},
      ...requestOptions
    });

    this.notifyResponse_(response);
    return response.data;
  }

  async fetchStream(url, options = {}) {
    const {headers, ...requestOptions} = options;
    const response = await this.client_.request(url, {
      "digestAuth": this.digestAuth_,
      "streaming": true,
      "headers": {"Accept": this.accept_, ...headers},
      ...requestOptions
    });

    this.notifyResponse_(response);
    return response.res;
  }

  notifyResponse_(response) {
    if (this.onResponse_) {
      this.onResponse_({
        "headers": response.headers,
        "status": response.status
      });
    }
  }
}

module.exports = HttpClient;
