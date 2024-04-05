import {ClusterName, Links, AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";

export interface GetReplicaSetCloudBackup {
    cloudProvider: 'AWS' | 'GCP' | 'AZURE' | 'TENANT';
    copyRegions: string[];
    createdAt: string;
    description?: string;
    expiresAt: string;
    frequencyType: 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly';
    id: string;
    links: Links;
    masterKeyUUID?: string;
    mongodVersion: string;
    policyItems: Array;
    replicaSetName: string;
    snapshotType: 'onDemand' | 'scheduled';
    status: 'queued' | 'inProgress' | 'completed' | 'failed';
    storageSizeBytes: number;
    type: string
}

export type GetAllReplicaSetCloudBackups = AtlasResultsResponse<GetReplicaSetCloudBackup>;

export interface RestoreSnapshotJobComponent {
    replicaSetName: string
}

export interface GetRestoreSnapshotJob {
    cancelled?: boolean;
    components?: RestoreSnapshotJobComponent[];
    deliveryType: 'automated' | 'download' | 'pointInTime';
    deliveryUrl?: string[];
    desiredTimestamp?: {
        date: string;
        increment: number
    };
    expired?: boolean;
    expiresAt?: string;
    failed?: boolean;
    finishedAt?: string;
    id?: string;
    links?: Links;
    oplogInc?: number;
    oplogTs?: number;
    pointInTimeUTCSeconds?: number;
    snapshotId?: string;
    targetClusterName?: string;
    targetGroupId?: string;
    timestamp?: string
}

export interface RestoreSnapshotJobRequest {
    deliveryType: 'automated' | 'download' | 'pointInTime';
    oplogInc?: number;
    oplogTs?: number;
    pointInTimeUTCSeconds?: number;
    snapshotId?: string;
    targetClusterName?: string;
    targetGroupId?: string
}
export type CreateRestoreSnapshotJobResponse = GetClusterResponse;

export interface Cluster {
    getReplicaSetCloudBackup(clustername: ClusterName, snapshotId: string, options?: AtlasClientOptions): Promise<GetReplicaSetCloudBackup | AtlasError>;
    getAllReplicaSetCloudBackups(clustername: ClusterName, options?: AtlasClientOptions): Promise<GetAllReplicaSetCloudBackups | AtlasError>;
    getRestoreSnapshotJob(clustername: ClusterName, restoreJobId: string): Promise<CreateRestoreSnapshotJobResponse | AtlasError>
    createRestoreSnapshotJob(clustername: ClusterName, body: RestoreSnapshotJobRequest): Promise<CreateRestoreSnapshotJobResponse | AtlasError>
}