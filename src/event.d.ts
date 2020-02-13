import {Links, AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";
import {OrganizationId} from "./organization";

// EventClient
export type EventId = string;
export interface GetEventResponse {
    alertId: string;
    alertConfigId: string;
    apiKeyId: string;
    collection: string;
    created: string;
    currentValue: {
        number: number;
        units: string;
    };
    database: string;
    eventTypeName: string;
    groupId: string;
    hostname: string;
    id: string;
    invoiceId: string;
    isGlobalAdmin: boolean;
    links: Links;
    metricName: string;
    opType: string;
    orgId: string;
    paymentId: string;
    port: number;
    publicKey: string;
    remoteAddress: string;
    replicaSetName: string;
    shardName: string;
    targetPublicKey: string;
    targetUsername: string;
    teamId: string;
    userId: string;
    username: string;
    whitelistentry: string;
}
export type GetAllEventsResponse = AtlasResultsResponse<GetEventResponse>;
export interface Event {
    get(eventId: EventId, options?: AtlasClientOptions): Promise<GetEventResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllEventsResponse | AtlasError>;
    getByOrganizationId(organizationId: OrganizationId, eventId: EventId, options?: AtlasClientOptions): Promise<GetEventResponse | AtlasError>;
    getAllByOrganizationId(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<GetEventResponse[] | AtlasError>;
}