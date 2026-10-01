import {OrganizationRoleName} from "./organization";
import {ProjectRoleName} from "./project";
import {AtlasResultsResponse, AtlasClientOptions, AtlasError, Links} from ".";

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
export interface UpdateAtlasUserRequest {
    groupRoles?: string[];
}
export type UpdateAtlasUserResponse = GetAtlasUserResponse;
export interface AtlasUser {
    getById(userId: AtlasUserId, options?: AtlasClientOptions): Promise<GetAtlasUserResponse | AtlasError>;
    getByName(username: AtlasUserName, options?: AtlasClientOptions): Promise<GetAllAtlasUsersResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllAtlasUsersResponse | AtlasError>;
    create(atlasuser: CreateAtlasUserRequest, options?: AtlasClientOptions): Promise<CreateAtlasUserResponse | AtlasError>;
    /** @deprecated Use addRole or removeRole for individual role changes. */
    updateRoles(userId: AtlasUserId, roles: UpdateAtlasUserRequest, options?: AtlasClientOptions): Promise<UpdateAtlasUserResponse | AtlasError>;
    addRole(userId: AtlasUserId, role: {groupRole: string}, options?: AtlasClientOptions): Promise<UpdateAtlasUserResponse | AtlasError>;
    removeRole(userId: AtlasUserId, role: {groupRole: string}, options?: AtlasClientOptions): Promise<UpdateAtlasUserResponse | AtlasError>;
}