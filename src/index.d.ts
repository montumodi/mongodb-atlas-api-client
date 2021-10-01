import {Alert} from './alert'
import {AtlasUser} from './atlasUser';
import {Cluster} from './cluster';
import {CustomDbRole} from './customDbRole';
import {Event} from './event';
import {Organization} from './organization';
import {Project} from './project';
import {ProjectWhitelist} from './projectWhitelist';
import {ProjectAccesslist} from './projectAccesslist';
import {User} from './user';
import {DataLake} from './dataLake';
import {CloudProviderAccess} from './cloudProviderAccess';
import {AtlasSearch} from './atlasSearch';

export * from './alert'
export * from './atlasUser';
export * from './cluster';
export * from './customDbRole';
export * from './event';
export * from './organization';
export * from './project';
export * from './projectWhitelist';
export * from './projectAccesslist';
export * from './user';
export * from './dataLake'
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

// Atlas Client
export interface AtlasClient {
    user: User;
    alert: Alert;
    atlasUser: AtlasUser;
    organization: Organization;
    project: Project;
    projectWhitelist: ProjectWhitelist;
    projectAccesslist: ProjectAccesslist;
    customDbRole: CustomDbRole;
    cluster: Cluster;
    event: Event;
    dataLake: DataLake;
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
}

export interface AtlasClientOptions {
    envelope?: boolean;
    itemsPerPage?: number;
    pretty?: boolean;
}

export default function getMongodbAtlasApiClient(config: AtlasClientConfig): AtlasClient;
