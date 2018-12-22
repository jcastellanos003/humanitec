import { NgModule, ModuleWithProviders, APP_INITIALIZER } from '@angular/core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import {
    ApiConfigInjectionToken,
    AppModulesConfigInjectionToken,
    AppConfigInjectionToken
} from '@humanitec/shared/tokens';

import { AppConfig, ApiConfig, AppModulesConfig } from './models';
import { CustomHttpInterceptor } from './interceptors/http/http.interceptor';
import { StaticConfigService } from './services/static.service';

@NgModule({
    imports: [HttpClientModule]
})
export class HumanitecCoreModule {
    static forRoot(config: AppConfig): ModuleWithProviders {
        return {
            ngModule: HumanitecCoreModule,
            providers: [
                {
                    provide: APP_INITIALIZER,
                    useFactory: loadStaticConfig,
                    deps: [StaticConfigService, AppConfigInjectionToken],
                    multi: true
                },
                {
                    provide: AppConfigInjectionToken,
                    useValue: config
                },
                {
                    provide: ApiConfigInjectionToken,
                    useFactory: getApiConfig,
                    deps: [StaticConfigService]
                },
                {
                    provide: AppModulesConfigInjectionToken,
                    useFactory: getAppModulesConfig,
                    deps: [StaticConfigService]
                },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: CustomHttpInterceptor,
                    multi: true
                },
                StaticConfigService
            ]
        };
    }
}

export function loadStaticConfig(
    staticConfigService: StaticConfigService,
    config: AppConfig
) {
    return () => staticConfigService.loadConfig(config.appConfigUrl);
}

export function getApiConfig(staticConfigService: StaticConfigService) {
    return staticConfigService.get<ApiConfig>('api');
}

export function getAppModulesConfig(staticConfigService: StaticConfigService) {
    return staticConfigService.get<AppModulesConfig>('modules');
}
