import {Links, AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";

// ProjectaccesslistClient
export type AccesslistEntryName = string;
export interface GetAccesslistEntryResponse {
    awsSecurityGroup: string;
    cidrBlock: string;
    ipAddress: string;
    groupId: string;
    comment: string;
    deleteAfterDate: string;
    links: Links;
}
export type GetAllAccesslistEntriesResponse = AtlasResultsResponse<GetAccesslistEntryResponse>;
export interface CreateAccesslistEntryRequest {
    awsSecurityGroup: string;
    cidrBlock: string;
    ipAddress: string;
    comment?: string;
    deleteAfterDate?: string;
}
export type CreateAccesslistEntryResponse = GetAccesslistEntryResponse;
export interface UpdateAccesslistEntryRequest {
    awsSecurityGroup: string;
    cidrBlock: string;
    ipAddress: string;
    comment?: string;
    deleteAfterDate?: string;
}
export type UpdateAccesslistEntryResponse = GetAccesslistEntryResponse;
export interface ProjectAccesslist {
    get(accesslistentryname: AccesslistEntryName, options?: AtlasClientOptions): Promise<GetAccesslistEntryResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllAccesslistEntriesResponse | AtlasError>;
    delete(accesslistentryname: AccesslistEntryName, options?: AtlasClientOptions): Promise<void | AtlasError>;
    create(accesslistentry: CreateAccesslistEntryRequest, options?: AtlasClientOptions): Promise<CreateAccesslistEntryResponse | AtlasError>;
    update(accesslistentryname: AccesslistEntryName, accesslistentry: UpdateAccesslistEntryRequest, options?: AtlasClientOptions): Promise<UpdateAccesslistEntryResponse | AtlasError>;
}
