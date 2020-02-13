import {AtlasClientOptions, AtlasError} from '.';

// AlertClient
export type AlertId = string;
export interface Alert {
    get(alertId: AlertId, options?: AtlasClientOptions): Promise<any | AtlasError>;
    getAll(options?: AtlasClientOptions): Promise<any | AtlasError>;
    acknowledge(alertId: AlertId, options?: AtlasClientOptions): Promise<any | AtlasError>;
}