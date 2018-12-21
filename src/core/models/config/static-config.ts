export interface ApiFeaturesConfig {
    dashboard: { programs: string };
    activities: { activity: string };
}

export interface AppModulesConfig {
    dashboard: {
        activityList: {
            tableConfig: any;
        };
    };
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
    modules: AppModulesConfig;
}

export type StaticChunksConfig = 'api' | 'modules';
