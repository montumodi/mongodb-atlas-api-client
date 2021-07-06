import {AtlasClientOptions, AtlasError} from '.';

// DataLakeClient
export type DataLakeName = string;
export interface DataLake {
    get(dataLakeName: DataLakeName, options?: AtlasClientOptions): Promise<any | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<any | AtlasError>;
    getLogsStream(dataLakeName: DataLakeName, options?: AtlasClientOptions): Promise<any | AtlasError>;
    delete(dataLakeName: DataLakeName, options?: AtlasClientOptions): Promise<any | AtlasError>;
    update(dataLakeName: DataLakeName, body: object, options?: AtlasClientOptions): Promise<any | AtlasError>;
    create(body: object, options?: AtlasClientOptions): Promise<any | AtlasError>;
}