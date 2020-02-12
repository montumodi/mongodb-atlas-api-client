declare module 'mongodb-atlas-api-client' {

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

    // UserClient
    export type Username = string;
    export interface GetUserResponse {
        databaseName: string;
        deleteAfterDate: string;
        labels: KeyValuePairDocumentArray;
        ladapAuthType: string;
        x509Type: string;
        groupId: string;
        roles: UserRoleConfig[];
        password: string;
        username: string;
    }
    export type GetAllUsersResponse = AtlasResultsResponse<GetUserResponse>;
    export interface CreateUserRequest {
        databaseName: string;
        deleteAfterDate?: string;
        labels?: KeyValuePairDocumentArray;
        ladapAuthType?: string;
        x509Type?: string;
        groupId: string;
        roles: UserRoleConfig[];
        password: string;
        username: string;
    }
    export type CreateUserResponse = GetUserResponse;
    export interface UserRoleConfig {
        collectionName?: string;
        databaseName: string;
        roleName: string;
    }
    export interface UpdateUserRequest {
        /**
         * ISO 8601 Date
         * ex: `new Date(string).toISOString();`
         */
        deleteAfterDate?: string;
        labels?: KeyValuePairDocumentArray;
        roles?: UserRoleConfig[];
        password?: string;
    }
    export type UpdateUserResponse = GetUserResponse;
    export interface UserClient {
        get(username: Username, options?: AtlasClientOptions): Promise<GetUserResponse | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<GetAllUsersResponse | AtlasError>;
        delete(username: Username, options?: AtlasClientOptions): Promise<void | AtlasError>;
        create(user: CreateUserRequest, options?: AtlasClientOptions): Promise<CreateUserResponse | AtlasError>;
        update(username: Username, user: UpdateUserRequest, options?: AtlasClientOptions): Promise<UpdateUserResponse | AtlasError>;
    }

    // AlertClient
    export type AlertId = string;
    export interface AlertClient {
        get(alertId: AlertId, options?: AtlasClientOptions): Promise<any | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<any | AtlasError>;
        acknowledge(alertId: AlertId, options?: AtlasClientOptions): Promise<any | AtlasError>;
    }

    // AtlasUserclient
    export type AtlasUserId = string;
    export type AtlasUserName = string;
    export interface AtlasUserOrgRole {
        orgId: string;
        roleName: OrganizationRoleName;
    }
    export interface AtlasUserGroupRole {
        groupId: string;
        roleName: ProjectRoleName;
    }
    export type AtlasUserRole = AtlasUserOrgRole | AtlasUserGroupRole;
    export interface GetAtlasUserResponse {
        emailAddress: string;
        firstName: string;
        id: string;
        lastName: string;
        links: Links;
        mobileNumber: string;
        roles: AtlasUserRole[];
        teamIds: string[];
        username: string;
    }
    export type GetAllAtlasUsersResponse = AtlasResultsResponse<GetAtlasUserResponse>;
    export interface CreateAtlasUserRequest {
        emailAddress: string;
        firstName: string;
        id: string;
        lastName: string;
        links: Links;
        mobileNumber: string;
        roles: AtlasUserRole[];
        teamIds: string[];
        username: string;
    }
    export type CreateAtlasUserResponse = GetAtlasUserResponse;
    export interface UpdateAtlasUserRequest {}
    export type UpdateAtlasUserResponse = GetAtlasUserResponse;
    export interface AtlasUserClient {
        getById(userId: AtlasUserId, options?: AtlasClientOptions): Promise<GetAtlasUserResponse | AtlasError>;
        getByName(username: AtlasUserName, options?: AtlasClientOptions): Promise<GetAtlasUserResponse | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<GetAllAtlasUsersResponse | AtlasError>;
        create(atlasuser: CreateAtlasUserRequest, options?: AtlasClientOptions): Promise<CreateAtlasUserResponse | AtlasError>;
        update(userId: AtlasUserId, atlasuser: UpdateAtlasUserRequest, options?: AtlasClientOptions): Promise<UpdateAtlasUserResponse | AtlasError>;
    }

    // OrganizationClient
    export type OrganizationId = string;
    export type OrganizationRoleName = 'ORG_OWNER' | 'ORG_GROUP_CREATOR' | 'ORG_BILLING_ADMIN' | 'ORG_READ_ONLY' | 'ORG_MEMBER';
    export interface GetOrganizationResponse {
        id: string;
        name: string;
        links: Links;
    }
    export type GetAllOrganizationsResponse = AtlasResultsResponse<GetOrganizationResponse>;
    export interface RenameOrganizationRequest {
        /**
         * The new name for the organization.
         */
        name: string;
    }
    export type RenameOrganizationResponse = GetOrganizationResponse;
    export interface OrganizationClient {
        getById(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<GetOrganizationResponse | AtlasError>;
        getAllUsersForOrganization(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<AtlasResultsResponse<GetAtlasUserResponse> | AtlasError>;
        getAllProjectsForOrganization(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<GetAllProjectsResponse | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<GetAllOrganizationsResponse | AtlasError>;
        delete(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<void | AtlasError>;
        rename(organizationId: OrganizationId, organization: RenameOrganizationRequest, options?: AtlasClientOptions): Promise<RenameOrganizationResponse | AtlasError>;
    }

    // Projectclient
    export type ProjectId = string;
    export type ProjectName = string;
    export interface GetProjectResponse {
        clusterCount: number;
        created: string;
        id: string;
        links: Links;
        name: string;
        orgId: string;
    }
    export type GetAllProjectsResponse = AtlasResultsResponse<GetProjectResponse>;
    export interface CreateProjectRequest {
        name: string;
        orgId: string;
    }
    export type CreateProjectResponse = GetProjectResponse;
    export interface GetTeamsByProjectResponse {
        links: Links;
        roleNames: string[];
        teamId: string;
    }
    export type ProjectRoleName = 'GROUP_OWNER' | 'GROUP_READ_ONLY' | 'GROUP_DATA_ACCESS_ADMIN' | 'GROUP_DATA_ACCESS_READ_WRITE' | 'GROUP_DATA_ACCESS_READ_ONLY';
    export interface AssignTeamsRequest {
        teamId: string;
        roleNames: ProjectRoleName[]
    }
    export interface AssignTeamsResponse {
        links: Links;
        roleNames: string[];
        teamId: string;
    }
    export interface ProjectClient {
        getById(projectId: ProjectId, options?: AtlasClientOptions): Promise<GetProjectResponse | AtlasError>;
        getByName(projectName: ProjectName, options?: AtlasClientOptions): Promise<GetProjectResponse | AtlasError>;
        getTeamsByProjectId(projectId: ProjectId, options?: AtlasClientOptions): Promise<GetTeamsByProjectResponse | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<GetAllProjectsResponse | AtlasError>;
        delete(projectId: ProjectId, options?: AtlasClientOptions): Promise<void | AtlasError>;
        removeUserFromProject(projectId: ProjectId, userId: AtlasUserId, options?: AtlasClientOptions): Promise<void | AtlasError>;
        create(project: CreateProjectRequest, options?: AtlasClientOptions): Promise<GetProjectResponse>;
        assignTeams(projectId: ProjectId, teams: AssignTeamsRequest[], options?: AtlasClientOptions): Promise<AssignTeamsResponse | AtlasError>;
    }

    // ProjectwhiltelistClient
    export type WhitelistEntryName = string;
    export interface GetWhitelistEntryResponse {
        awsSecurityGroup: string;
        cidrBlock: string;
        ipAddress: string;
        groupId: string;
        comment: string;
        deleteAftetrDate: string;
        links: Links;
    }
    export type GetAllWhitelistEntriesResponse = AtlasResultsResponse<GetWhitelistEntryResponse>;
    export interface CreateWhitelistEntryRequest {
        awsSecurityGroup: string;
        cidrBlock: string;
        ipAddress: string;
        comment?: string;
        deleteAftetrDate?: string;
    }
    export type CreateWhitelistEntryResponse = GetWhitelistEntryResponse;
    export interface UpdateWhitelistEntryRequest {
        awsSecurityGroup: string;
        cidrBlock: string;
        ipAddress: string;
        comment?: string;
        deleteAftetrDate?: string;
    }
    export type UpdateWhitelistEntryResponse = GetWhitelistEntryResponse;
    export interface ProjectWhitelistClient {
        get(whitelistentryname: WhitelistEntryName, options?: AtlasClientOptions): Promise<GetWhitelistEntryResponse | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<GetAllWhitelistEntriesResponse | AtlasError>;
        delete(whitelistentryname: WhitelistEntryName, options?: AtlasClientOptions): Promise<void | AtlasError>;
        create(whitelistentry: CreateWhitelistEntryRequest, options?: AtlasClientOptions): Promise<CreateWhitelistEntryResponse | AtlasError>;
        update(whitelistentryname: WhitelistEntryName, whitelistentry: UpdateWhitelistEntryRequest, options?: AtlasClientOptions): Promise<UpdateWhitelistEntryResponse | AtlasError>;
    }

    // CustomDbRoleClient
    export type RoleName = string;
    export interface GetCustomDbRoleResponse {
        actions: {
            action: string;
            resources: {
                collection: string;
                db: string;
                cluster: boolean;
            }[];
        }[];
        inheritedRoles: {
            db: string;
            role: string;
        }[];
        roleName: string;
    }
    export type GetAllCustomDbRolesResponse = AtlasResultsResponse<GetCustomDbRoleResponse>;
    export interface CreateCustomDbRoleRequest {
        actions: {
            action: string;
            resources: {
                collection: string;
                db: string;
                cluster: boolean;
            }[];
        }[];
        inheritedRoles: {
            db: string;
            role: string;
        }[];
        roleName: string;
    }
    export type CreateCustomDbRoleResponse = GetCustomDbRoleResponse;
    export interface UpdateCustomDbRoleRequest {
        actions: {
            action: string;
            resources: {
                collection: string;
                db: string;
                cluster: boolean;
            }[];
        }[];
        inheritedRoles: {
            db: string;
            role: string;
        }[];
        roleName: string;
    }
    export type UpdateCustomDbRoleResponse = GetCustomDbRoleResponse;
    export interface CustomDbRoleClient {
        get(rolename: RoleName, options?: AtlasClientOptions): Promise<GetCustomDbRoleResponse | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<GetAllCustomDbRolesResponse | AtlasError>;
        delete(rolename: RoleName, options?: AtlasClientOptions): Promise<void | AtlasError>;
        create(role: CreateCustomDbRoleRequest, options?: AtlasClientOptions): Promise<CreateCustomDbRoleResponse | AtlasError>;
        update(rolename: RoleName, role: UpdateCustomDbRoleRequest, options?: AtlasClientOptions): Promise<UpdateCustomDbRoleResponse | AtlasError>;
    }

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
    export interface ClusterClient {
        get(clustername: ClusterName, options?: AtlasClientOptions): Promise<GetClusterResponse | AtlasError>;
        getAdvanceConfiguration(clustername: ClusterName, options?: AtlasClientOptions): Promise<GetClusterAdvancedConfigResponse | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<GetAllClustersResponse | AtlasError>;
        delete(cluster: ClusterName, options?: AtlasClientOptions): Promise<void | AtlasError>;
        create(cluster: CreateClusterRequest, options?: AtlasClientOptions): Promise<CreateClusterResponse | AtlasError>;
        update(clustername: ClusterName, cluster: UpdateClusterRequest, options?: AtlasClientOptions): Promise<UpdateClusterResponse | AtlasError>;
        updateAdvanceConfiguration(clustername: ClusterName, cluster: UpdateClusterAdvancedConfigurationRequest, options?: AtlasClientOptions): Promise<UpdateClusterAdvancedConfigurationResponse | AtlasError>;
        testPrimaryFailOver(clustername: ClusterName, options?: AtlasClientOptions): Promise<{} | AtlasError>;
    }

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
    export interface EventClient {
        get(eventId: EventId, options?: AtlasClientOptions): Promise<GetEventResponse | AtlasError>;
        getAll(options?: AtlasClientOptions): Promise<GetAllEventsResponse | AtlasError>;
        getByOrganizationId(organizationId: OrganizationId, eventId: EventId, options?: AtlasClientOptions): Promise<GetEventResponse | AtlasError>;
        getAllByOrganizationId(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<GetEventResponse[] | AtlasError>;
    }

    // Atlas Client
    export interface AtlasClient {
        user: UserClient;
        alert: AlertClient;
        atlasUser: AtlasUserClient;
        organization: OrganizationClient;
        project: ProjectClient;
        projectWhitelist: ProjectWhitelistClient;
        customDbRole: CustomDbRoleClient;
        cluster: ClusterClient;
        event: EventClient;
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
        projectId: String;
    }

    export interface AtlasClientOptions {
        envelope?: boolean;
        itemsPerPage?: number;
        pretty?: boolean;
    }

    export default function getMongodbAtlasApiClient(config: AtlasClientConfig): AtlasClient;
}
