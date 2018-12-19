export interface ApiFeaturesConfig {
    dashboard: { programs: string };
    activities: { activity: string };
}

export interface ApiAuthConfig {
    token: string;
}

export interface ApiConfig {
    url: string;
    auth: ApiAuthConfig;
    features: ApiFeaturesConfig;
}

export interface StaticConfig {
    api: ApiConfig;
}

export type StaticChunksConfig = 'api';
