import { Injectable } from '@angular/core';

import {
    StaticConfig,
    StaticChunksConfig,
    ApiConfig,
    AppModulesConfig
} from '../models';

@Injectable()
export class StaticConfigService {
    private staticConfig: StaticConfig;

    async loadConfig(staticUrl: string): Promise<StaticConfig> {
        const response = await fetch(staticUrl);
        const config = await response.json();
        return (this.staticConfig = config);
    }

    get<T extends ApiConfig | AppModulesConfig>(key: StaticChunksConfig): T {
        const res = this.staticConfig[key];
        return <T>res;
    }
}
