import {Alert} from './alert'
import {AtlasUser} from './atlasUser';
import {Cluster} from './cluster';
import {CloudBackup} from './cloudBackup';
import {CustomDbRole} from './customDbRole';
import {Event} from './event';
import {Organization} from './organization';
import {Project} from './project';
import {ProjectAccesslist} from './projectAccesslist';
import {User} from './user';
import {CloudProviderAccess} from './cloudProviderAccess';
import {AtlasSearch} from './atlasSearch';

export * from './alert'
export * from './atlasUser';
export * from './cluster';
export * from './cloudBackup';
export * from './customDbRole';
export * from './event';
export * from './organization';
export * from './project';
export * from './projectAccesslist';
export * from './user';
export * from './cloudProviderAccess';
export * from './atlasSearch';

export interface KeyValuePairDocument {
    key: string;
    value: string;
}

export type KeyValuePairDocumentArray = KeyValuePairDocument[];

export interface AtlasResultsResponse<T> {
    results: T[];
    links: Links;
    totalCount: number;
}

export interface Link {
    href: string;
    rel: string;
}

export type Links = Link[];

export interface AtlasError {
    details: string;
    error: number;
    errorCode: string;
    reason: string;
}

export type ResponseOrError<T> = T | AtlasError;

export interface AtlasResponseMetadata {
    headers?: object;
    status?: number;
}

// Atlas Client
export interface AtlasClient {
    user: User;
    alert: Alert;
    atlasUser: AtlasUser;
    organization: Organization;
    project: Project;
    projectAccesslist: ProjectAccesslist;
    customDbRole: CustomDbRole;
    cluster: Cluster;
    cloudBackup: CloudBackup;
    event: Event;
    cloudProviderAccess: CloudProviderAccess;
    atlasSearch: AtlasSearch
}

export interface AtlasClientConfig {
    /**
     * API Access Public Key
     */
    publicKey: string;
    /**
     * API Access Private Key
     */
    privateKey: string;
    /**
     * Base URL for Atlas API
     */
    baseUrl: string;
    /**
     * Target Project ID in Atlas account
     */
    projectId?: String;
    /**
     * Atlas Administration API resource version date
     */
    apiVersion?: string;
    /**
     * Receives metadata for every Atlas API response, including lifecycle headers.
     */
    onResponse?: (metadata: AtlasResponseMetadata) => void;
}

export interface AtlasClientOptions {
    envelope?: boolean;
    itemsPerPage?: number;
    pretty?: boolean;
    httpOptions?: object;
}

export default function getMongodbAtlasApiClient(config: AtlasClientConfig): AtlasClient;
