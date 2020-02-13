import {KeyValuePairDocumentArray, AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";

// Clusterclient
export type ClusterName = string;
export interface ClusterRegionConfig {
    [regionName: string]: {
        analyticsNodes: number;
        electableNodes: number;
        readOnlyNodes: number;
        priority: number;
    };
}
export interface GetClusterResponse {
    autoScaling: {
        compute: {
            enabled: boolean;
            scaleDownEnabled: boolean;
        };
        diskGBEnable: boolean;
    };
    backupEnabled: boolean;
    biConnector: {
        enabled: boolean;
        readPreference: 'primary' | 'secondary' | 'analytics'
    };
    clusterType: 'REPLICASET' | 'SHARDED' | 'GEOSHARDED';
    diskSizeGB: number;
    encryptionAtRestProvider: string;
    groupId: string;
    id: string;
    labels: KeyValuePairDocumentArray;
    mongoDBVersion: string;
    mongoDBMajorVersion: string;
    mongoURI: string;
    mongoURIUpdated: string;
    mongoURIWithOptions: string;
    name: string;
    numShards: number;
    paused: boolean;
    pitEnabled: boolean;
    providerBackupEnabled: boolean;
    providerSettings: {
        autoScaling: {
            compute: {
                minInstanceSize: string;
                maxInstanceSize: string;
            };
        };
        providerName: 'AWS' | 'GCP' | 'AZURE' | 'TENANT';
        backingProviderName: 'AWS' | 'GCP' | 'AZURE';
        regionName: string;
        instanceSizeName: string;
        diskIOPS: number;
        diskTypeName: 'P4' | 'P6' | 'P10' | 'P20' | 'P30' | 'P40' | 'P50';
        encryptEBSVolume: boolean;
    };
    replicationFactor: number;
    replicationSpec: ClusterRegionConfig;
    replicationSpecs: {
        id: string;
        zoneName: string;
        numShards: number;
        regionsConfig: ClusterRegionConfig;
    }[];
    srvAddress: string;
    stateName: string;
}
export type GetAllClustersResponse = AtlasResultsResponse<GetClusterResponse>;
export interface CreateClusterRequest {
    autoScaling?: {
        compute?: {
            enabled?: boolean;
            scaleDownEnabled?: boolean;
        };
        diskGBEnable?: boolean;
    };
    backupEnabled?: boolean;
    biConnector?: {
        enabled?: boolean;
        readPreference?: 'primary' | 'secondary' | 'analytics'
    };
    clusterType?: 'REPLICASET' | 'SHARDED' | 'GEOSHARDED';
    diskSizeGB?: number;
    encryptionAtRestProvider?: string;
    labels?: KeyValuePairDocumentArray;
    name: string;
    mongoDBMajorVersion?: string;
    numShards?: number;
    pitEnabled?: boolean;
    providerBackupEnabled?: boolean;
    providerSettings: {
        autoScaling?: {
            compute?: {
                minInstanceSize?: string;
                maxInstanceSize?: string;
            };
        };
        backingProviderName?: 'AWS' | 'GCP' | 'AZURE';
        diskIOPS?: number;
        diskTypeName?: 'P4' | 'P6' | 'P10' | 'P20' | 'P30' | 'P40' | 'P50';
        encryptEBSVolume?: boolean;
        instanceSizeName?: string;
        providerName?: 'AWS' | 'GCP' | 'AZURE' | 'TENANT';
        regionName?: string;
        volumeType?: string;
    };
    replicationFactor?: number;
    replicationSpec?: ClusterRegionConfig;
    replicationSpecs?: {
        id?: string;
        zoneName: string;
        numShards: number;
        regionsConfig?: ClusterRegionConfig;
    }[];
}
export interface GetClusterAdvancedConfigResponse {
    failIndexKeyTooLong: boolean;
    javascriptEnabled: boolean;
    minimumEnabledTlsProtocol: string;
    noTableScan: boolean;
    oplogSizeMB: number;
    sampleSizeBIConnector: number;
    sampleRefreshIntervalBIConnector: number;
}
export type CreateClusterResponse = GetClusterResponse;
export interface UpdateClusterRequest {
    autoScaling?: {
        compute?: {
            enabled?: boolean;
            scaleDownEnabled?: boolean;
        };
        diskGBEnable?: boolean;
    };
    backupEnabled?: boolean;
    biConnector?: {
        enabled?: boolean;
        readPreference?: 'primary' | 'secondary' | 'analytics'
    };
    clusterType?: 'REPLICASET' | 'SHARDED' | 'GEOSHARDED';
    diskSizeGB?: number;
    encryptionAtRestProvider?: string;
    labels?: KeyValuePairDocumentArray;
    name: string;
    mongoDBMajorVersion?: string;
    numShards?: number;
    pitEnabled?: boolean;
    providerBackupEnabled?: boolean;
    providerSettings: {
        autoScaling?: {
            compute?: {
                minInstanceSize?: string;
                maxInstanceSize?: string;
            };
        };
        backingProviderName?: 'AWS' | 'GCP' | 'AZURE';
        diskIOPS?: number;
        diskTypeName?: 'P4' | 'P6' | 'P10' | 'P20' | 'P30' | 'P40' | 'P50';
        encryptEBSVolume?: boolean;
        instanceSizeName?: string;
        providerName?: 'AWS' | 'GCP' | 'AZURE' | 'TENANT';
        regionName?: string;
        volumeType?: string;
    };
    replicationFactor?: number;
    replicationSpec?: ClusterRegionConfig;
    replicationSpecs?: {
        id?: string;
        zoneName: string;
        numShards: number;
        regionsConfig?: ClusterRegionConfig;
    }[];
}
export type UpdateClusterResponse = GetClusterResponse;
export interface UpdateClusterAdvancedConfigurationRequest {
    failIndexKeyTooLong?: boolean;
    javascriptEnabled?: boolean;
    minimumEnabledTlsProtocol?: string;
    noTableScan?: boolean;
    oplogSizeMB?: number;
    sampleSizeBIConnector?: number;
    sampleRefreshIntervalBIConnector?: number;
}
export type UpdateClusterAdvancedConfigurationResponse = GetClusterAdvancedConfigResponse
export interface Cluster {
    get(clustername: ClusterName, options?: AtlasClientOptions): Promise<GetClusterResponse | AtlasError>;
    getAdvanceConfiguration(clustername: ClusterName, options?: AtlasClientOptions): Promise<GetClusterAdvancedConfigResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllClustersResponse | AtlasError>;
    delete(cluster: ClusterName, options?: AtlasClientOptions): Promise<void | AtlasError>;
    create(cluster: CreateClusterRequest, options?: AtlasClientOptions): Promise<CreateClusterResponse | AtlasError>;
    update(clustername: ClusterName, cluster: UpdateClusterRequest, options?: AtlasClientOptions): Promise<UpdateClusterResponse | AtlasError>;
    updateAdvanceConfiguration(clustername: ClusterName, cluster: UpdateClusterAdvancedConfigurationRequest, options?: AtlasClientOptions): Promise<UpdateClusterAdvancedConfigurationResponse | AtlasError>;
    testPrimaryFailOver(clustername: ClusterName, options?: AtlasClientOptions): Promise<{} | AtlasError>;
}