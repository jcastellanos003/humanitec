import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';

import {
    ActivitiesState,
    getActivityListLoaded,
    LoadActivities
} from '@humanitec/state/activities';

import { Observable, of } from 'rxjs';
import { take, switchMap, filter, catchError } from 'rxjs/operators';

@Injectable()
export class ActivitiesListGuard implements CanActivateChild {
    constructor(private store: Store<ActivitiesState>) {}

    canActivateChild(route: ActivatedRouteSnapshot): Observable<boolean> {
        const programId = parseInt(route.params.programId, 10);

        return this.checkStore(programId).pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(programId: number): Observable<boolean> {
        this.store.dispatch(new LoadActivities(programId));
        return this.store.select(getActivityListLoaded).pipe(
            filter(loaded => loaded),
            take(1)
        );
    }
}
