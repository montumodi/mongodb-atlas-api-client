import {KeyValuePairDocumentArray, AtlasResultsResponse, AtlasClientOptions, AtlasError} from ".";

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
export interface User {
    get(username: Username, options?: AtlasClientOptions): Promise<GetUserResponse | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<GetAllUsersResponse | AtlasError>;
    delete(username: Username, options?: AtlasClientOptions): Promise<void | AtlasError>;
    create(user: CreateUserRequest, options?: AtlasClientOptions): Promise<CreateUserResponse | AtlasError>;
    update(username: Username, user: UpdateUserRequest, options?: AtlasClientOptions): Promise<UpdateUserResponse | AtlasError>;
}
