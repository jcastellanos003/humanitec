import { NgModule } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { ApiConfig } from '@humanitec/core';
import { ApiConfigInjectionToken } from '@humanitec/shared/tokens';

import { reducers, effects, FEATURE_ACTIVITIES_NAME } from './store';

import { ActivityService } from './services/activity.service';

@NgModule({
    imports: [
        StoreModule.forFeature(FEATURE_ACTIVITIES_NAME, reducers),
        EffectsModule.forFeature(effects)
    ],
    providers: [
        {
            provide: ActivityService,
            useFactory: activitiesServiceFactory,
            deps: [HttpClient, ApiConfigInjectionToken]
        }
    ]
})
export class HumanitecActivitiesStateModule {}

export function activitiesServiceFactory(
    httpClient: HttpClient,
    apiConfig: ApiConfig
): ActivityService {
    return new ActivityService(
        httpClient,
        apiConfig.features.activities.activity
    );
}
