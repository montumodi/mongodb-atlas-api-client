const {getQueryStringFromOptions} = require("./helper");

class NetworkPeer {

    constructor(client, baseUrl, projectId) {
        this.client_ = client;
        this.baseUrl_ = baseUrl;
        this.projectId_ = projectId;
    }

    async getAllContainersInProject(options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/containers/all?${queryString}`, httpOptions)
        );
        return response;
    }

    async getAllContainersInCloudProvider(options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/containers?${queryString}`, httpOptions)
        );
        return response;
    }

    async getContainerByContainerId(containerId, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/containers/${containerId}?${queryString}`, httpOptions)
        );
        return response;
    }

    async getAllPeeringsInProject(options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/peers?${queryString}`, httpOptions)
        );
        return response;
    }

    async getPeeringByPeeringId(peerId, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/peers/${peerId}?${queryString}`, httpOptions)
        );
        return response;
    }

    async getPeeringOnlyMode(options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/privateIpMode?${queryString}`, httpOptions)
        );
        return response;
    }

    async createContainer(body, options = {}) {
        const queryString = getQueryStringFromOptions(options);
        const httpOptions = options.httpOptions;
        const response = (
            await this.client_.fetch(`${this.baseUrl_}/groups/${this.projectId_}/containers?${queryString}`, {
                "method": "POST",
                "data": body,
                "headers": { "Content-Type": "application/json" },
                ...httpOptions
            })
        );
        return response;
    }



}

module.exports = NetworkPeer;