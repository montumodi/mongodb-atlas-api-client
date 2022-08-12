const {getQueryStringFromOptions} = require("./helper");

class NetworkPeer {

    constructor(client, baseUrl, projectId) {
        this.client_ = client;
        this.baseUrl_ = baseUrl;
        this.projectId_ = projectId;
    }

    async getClusters(options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters?${queryString}`, httpOptions)
        );
        return response;
    }

    async getClustersByClusterName(clusterName, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}?${queryString}`, httpOptions)
        );
        return response;
    }

    async getClusters(options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters?${queryString}`, httpOptions)
        );
        return response;
    }

    async getClustersByClusterName(clusterName, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/processArgs?${queryString}`, httpOptions)
        );
        return response;
    }

    async createClusters(body, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters?${queryString}`, {
                "method": POST,
                "data": body,
                "headers": { "Content-Type": "application/json" },
                ...httpOptions
            })
        );
        return response;
    }

    async updateClustersByClusterName(clusterName, body, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}?${queryString}`, {
                "method": PATCH,
                "data": body,
                "headers": { "Content-Type": "application/json" },
                ...httpOptions
            })
        );
        return response;
    }

    async updateClustersByClusterName(clusterName, body, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/processArgs?${queryString}`, {
                "method": PATCH,
                "data": body,
                "headers": { "Content-Type": "application/json" },
                ...httpOptions
            })
        );
        return response;
    }

    async deleteClustersByClusterName(clusterName, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}?${queryString}`, {
            "method": "DELETE",
            ...httpOptions
        });
        return true;
    }

    async createClustersByClusterName(clusterName, body, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/restartPrimaries?${queryString}`, {
                "method": POST,
                "data": body,
                "headers": { "Content-Type": "application/json" },
                ...httpOptions
            })
        );
        return response;
    }

    async getClustersByClusterName(clusterName, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/${clusterName}/status?${queryString}`, httpOptions)
        );
        return response;
    }

    async createSampleDatasetLoadByClusterName(clusterName, body, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/sampleDatasetLoad/${clusterName}?${queryString}`, {
                "method": POST,
                "data": body,
                "headers": { "Content-Type": "application/json" },
                ...httpOptions
            })
        );
        return response;
    }

    async getSampleDatasetLoadBySampleDatasetId(sampleDatasetId, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/sampleDatasetLoad/${sampleDatasetId}?${queryString}`, httpOptions)
        );
        return response;
    }

    async getClustersByProvider(options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/clusters/provider/regions?${queryString}`, httpOptions)
        );
        return response;
    }

}

module.exports = NetworkPeer;