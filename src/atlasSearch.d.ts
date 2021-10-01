import {AtlasClientOptions, AtlasError} from '.';

// DataLakeClient
export type ClusterName = string;
export type IndexId = string;
export type DatabaseName = string;
export type CollectionName = string;

export interface AtlasSearch {
    get(clusterName: ClusterName, indexId: IndexId, options?: AtlasClientOptions): Promise<any | AtlasError>;
    getAll(clusterName: ClusterName, databaseName: DatabaseName, collectionName: CollectionName, options?: AtlasClientOptions): Promise<any | AtlasError>;
    delete(clusterName: ClusterName, indexId: IndexId, options?: AtlasClientOptions): Promise<any | AtlasError>;
    update(clusterName: ClusterName, indexId: IndexId, body: object, options?: AtlasClientOptions): Promise<any | AtlasError>;
    create(clusterName: ClusterName, body: object, options?: AtlasClientOptions): Promise<any | AtlasError>;
    getAllAnalyzers(clusterName: ClusterName, options?: AtlasClientOptions): Promise<any | AtlasError>;
    upsertAnalyzer(clusterName: ClusterName, body: object, options?: AtlasClientOptions): Promise<any | AtlasError>;
}