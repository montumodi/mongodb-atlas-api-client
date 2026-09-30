import {AtlasClientOptions, AtlasError} from ".";
import type {operations} from "./atlasAdminApiV2";

export type ClusterName = string;
export type GetClusterResponse = operations["getGroupCluster"]["responses"][200]["content"]["application/vnd.atlas.2024-08-05+json"];
export type GetAllClustersResponse = operations["listGroupClusters"]["responses"][200]["content"]["application/vnd.atlas.2024-08-05+json"];
export type CreateClusterRequest = operations["createGroupCluster"]["requestBody"]["content"]["application/vnd.atlas.2024-10-23+json"];
export type CreateClusterResponse = operations["createGroupCluster"]["responses"][201]["content"]["application/vnd.atlas.2024-10-23+json"];
export type UpdateClusterRequest = operations["updateGroupCluster"]["requestBody"]["content"]["application/vnd.atlas.2024-10-23+json"];
export type UpdateClusterResponse = operations["updateGroupCluster"]["responses"][200]["content"]["application/vnd.atlas.2024-10-23+json"];
export type GetClusterAdvancedConfigResponse = operations["getGroupClusterProcessArgs"]["responses"][200]["content"]["application/vnd.atlas.2024-08-05+json"];
export type UpdateClusterAdvancedConfigurationRequest = operations["updateGroupClusterProcessArgs"]["requestBody"]["content"]["application/vnd.atlas.2024-08-05+json"];
export type UpdateClusterAdvancedConfigurationResponse = operations["updateGroupClusterProcessArgs"]["responses"][200]["content"]["application/vnd.atlas.2024-08-05+json"];

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
