import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import {
    ActivitiesState,
    getActivityList,
    getActivityListLoaded,
    LoadActivities
} from '@humanitec/state/activities';

import { Observable, of } from 'rxjs';
import { take, switchMap, filter, tap, catchError } from 'rxjs/operators';

@Injectable()
export class ActivitiesGuard implements CanActivateChild {
    constructor(private store: Store<ActivitiesState>) {}

    canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
        const programId = parseInt(route.params.programId, 10);

        return this.checkStore(programId).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(programId: number): Observable<boolean> {
        return this.store.select(getActivityListLoaded).pipe(
            tap(loaded => {
                console.log('check activities:', loaded);
                if (!loaded) {
                    this.store.dispatch(new LoadActivities(programId));
                }
            }),
            filter(loaded => loaded),
            take(1)
        );
    }
}
