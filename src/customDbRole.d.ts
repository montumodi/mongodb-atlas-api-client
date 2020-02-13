import {AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";

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
export interface CustomDbRole {
    get(rolename: RoleName, options?: AtlasClientOptions): Promise<GetCustomDbRoleResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllCustomDbRolesResponse | AtlasError>;
    delete(rolename: RoleName, options?: AtlasClientOptions): Promise<void | AtlasError>;
    create(role: CreateCustomDbRoleRequest, options?: AtlasClientOptions): Promise<CreateCustomDbRoleResponse | AtlasError>;
    update(rolename: RoleName, role: UpdateCustomDbRoleRequest, options?: AtlasClientOptions): Promise<UpdateCustomDbRoleResponse | AtlasError>;
}
