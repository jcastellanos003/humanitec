import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ApiConfig } from '@humanitec/core';
import { ApiConfigInjectionToken } from '@humanitec/shared/tokens';

import { reducers, effects, FEATURE_COMMON_NAME } from './store';

import { ProgramsService } from './services/programs.service';

@NgModule({
    imports: [
        StoreModule.forFeature(FEATURE_COMMON_NAME, reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        {
            provide: ProgramsService,
            useFactory: programsServiceFactory,
            deps: [HttpClient, ApiConfigInjectionToken]
        }
    ]
})
export class HumanitecCommonStateModule {}

export function programsServiceFactory(
    httpClient: HttpClient,
    apiConfig: ApiConfig
): ProgramsService {
    return new ProgramsService(
        httpClient,
        apiConfig.features.dashboard.programs
    );
}
