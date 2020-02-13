import {Links, AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";

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
export interface ProjectWhitelist {
    get(whitelistentryname: WhitelistEntryName, options?: AtlasClientOptions): Promise<GetWhitelistEntryResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllWhitelistEntriesResponse | AtlasError>;
    delete(whitelistentryname: WhitelistEntryName, options?: AtlasClientOptions): Promise<void | AtlasError>;
    create(whitelistentry: CreateWhitelistEntryRequest, options?: AtlasClientOptions): Promise<CreateWhitelistEntryResponse | AtlasError>;
    update(whitelistentryname: WhitelistEntryName, whitelistentry: UpdateWhitelistEntryRequest, options?: AtlasClientOptions): Promise<UpdateWhitelistEntryResponse | AtlasError>;
}
