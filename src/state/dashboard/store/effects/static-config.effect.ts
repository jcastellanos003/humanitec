import { Injectable, Inject } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { AppModulesConfigInjectionToken } from '@humanitec/shared/tokens';
import { AppModulesConfig } from '@humanitec/core';

import {
    LOAD_STATIC_CONFIG,
    LoadStaticConfigSuccess,
    LoadStaticConfigFail
} from '../actions/static-config.action';

import { of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class StaticConfigEffects {
    constructor(
        private actions$: Actions,
        @Inject(AppModulesConfigInjectionToken)
        private modulesConfig: AppModulesConfig
    ) {}

    @Effect()
    loadModulesConfig$ = this.actions$.ofType(LOAD_STATIC_CONFIG).pipe(
        map(() => new LoadStaticConfigSuccess(this.modulesConfig)),
        catchError(error => of(new LoadStaticConfigFail(error)))
    );
}
