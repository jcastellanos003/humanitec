import { Injectable } from '@angular/core';

import { StaticConfig, StaticChunksConfig, ApiConfig } from '../models';

@Injectable()
export class StaticConfigService {
    private staticConfig: StaticConfig;

    async loadConfig(staticUrl: string): Promise<StaticConfig> {
        const response = await fetch(staticUrl);
        const config = await response.json();
        return (this.staticConfig = config);
    }

    get<T extends ApiConfig>(key: StaticChunksConfig): T {
        const res = this.staticConfig[key];
        return <T>res;
    }
}
