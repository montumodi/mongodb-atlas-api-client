import {AtlasClientOptions, AtlasError} from '.';

// DataLakeClient
export type RoleId = string;
export interface CloudProviderAccess {
    getAll(options?: AtlasClientOptions): Promise<any | AtlasError>;
    delete(cloudProvider: string, roleId: RoleId, options?: AtlasClientOptions): Promise<any | AtlasError>;
    update(roleId: RoleId, body: object, options?: AtlasClientOptions): Promise<any | AtlasError>;
    create(body: object, options?: AtlasClientOptions): Promise<any | AtlasError>;
}