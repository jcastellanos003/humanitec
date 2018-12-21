import { Injectable } from '@angular/core';
import { CanActivateChild } from '@angular/router';

import { Store } from '@ngrx/store';

import {
    DashboardState,
    getStaticConfigLoaded,
    LoadStaticConfig
} from '@humanitec/state/dashboard';

import { Observable, of } from 'rxjs';
import { take, switchMap, filter, tap, catchError } from 'rxjs/operators';

@Injectable()
export class StaticConfigGuard implements CanActivateChild {
    constructor(private store: Store<DashboardState>) {}

    canActivateChild(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(getStaticConfigLoaded).pipe(
            tap(loaded => {
                if (!loaded) {
                    this.store.dispatch(new LoadStaticConfig());
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }
}
