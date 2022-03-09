import {Links, AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";
import {GetAtlasUserResponse} from "./atlasUser";
import {GetAllProjectsResponse} from "./project";

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

export interface InviteOneToOrganizationRequest {
    roles: string[],
    teamIds?: string[],
    username: string,
}

export interface InviteOneToOrganizationResponse {
    createdAt: string,
    expiresAt: string,
    id: string,
    inviterUsername: string,
    orgId: string,
    orgName: string,
    roles: string[],
    teamIds: string[],
    username: string,
}
export type RenameOrganizationResponse = GetOrganizationResponse;
export interface Organization {
    getById(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<GetOrganizationResponse | AtlasError>;
    getAllUsersForOrganization(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<AtlasResultsResponse<GetAtlasUserResponse> | AtlasError>;
    getAllProjectsForOrganization(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<GetAllProjectsResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllOrganizationsResponse | AtlasError>;
    delete(organizationId: OrganizationId, options?: AtlasClientOptions): Promise<void | AtlasError>;
    rename(organizationId: OrganizationId, organization: RenameOrganizationRequest, options?: AtlasClientOptions): Promise<RenameOrganizationResponse | AtlasError>;
    invite(organizationId: OrganizationId, organization: InviteOneToOrganizationRequest, options?: AtlasClientOptions): Promise<InviteOneToOrganizationResponse | AtlasError>;
}
