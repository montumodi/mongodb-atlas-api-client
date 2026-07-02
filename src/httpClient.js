class HttpClient {
  constructor(client, publicKey, privateKey, headers = {}) {
    this.client_ = client;
    this.digestAuth_ = `${publicKey}:${privateKey}`;
    this.defaultHeaders_ = headers;
  }

  async fetch(url, options = {}) {
    const mergedOptions = {
      "digestAuth": this.digestAuth_,
      "dataType": "json",
      ...options,
      "headers": {
        ...this.defaultHeaders_,
        ...(options.headers || {})
      }
    };
    
    const response = await this.client_.request(url, mergedOptions);

    return response.data;
  }

  async fetchStream(url, options = {}) {
    const mergedOptions = {
      "digestAuth": this.digestAuth_,
      "streaming": true,
      ...options,
      "headers": {
        ...this.defaultHeaders_,
        ...(options.headers || {})
      }
    };
    
    const response = await this.client_.request(url, mergedOptions);

    return response.res;
  }
}

module.exports = HttpClient;
