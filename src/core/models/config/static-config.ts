export interface ApiModulesConfig {
    dashboard: string;
    activities: string;
}

export interface ApiAuthConfig {
    token: string;
}

export interface ApiConfig {
    url: string;
    auth: ApiAuthConfig;
    modules: ApiModulesConfig;
}

export interface StaticConfig {
    api: ApiConfig;
}

export type StaticChunksConfig = 'api';
