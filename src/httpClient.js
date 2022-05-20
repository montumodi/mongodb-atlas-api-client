class HttpClient {
  constructor(client, publicKey, privateKey) {
    this.client_ = client;
    this.digestAuth_ = `${publicKey}:${privateKey}`;
  }

  async fetch(url, options) {
    const response = await this.client_.request(url, {
      "digestAuth": this.digestAuth_,
      "dataType": "json",
      ...options
    });

    return response.data;
  }

  async fetchStream(url, options) {
    const response = await this.client_.request(url, {
      "digestAuth": this.digestAuth_,
      "streaming": true,
      ...options
    });

    return response.res;
  }
}

module.exports = HttpClient;
