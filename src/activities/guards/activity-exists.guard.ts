import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';

import {
    ActivitiesState,
    getSelectedActivity
} from '@humanitec/state/activities';

import { Observable, of } from 'rxjs';
import { map, take, switchMap, filter, catchError } from 'rxjs/operators';

@Injectable()
export class ActivityExistsGuard implements CanActivate {
    constructor(private store: Store<ActivitiesState>) {}

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap((exists: boolean) => of(exists)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean> {
        return this.store.select(getSelectedActivity).pipe(
            map(activity => !!activity),
            filter(exists => exists),
            take(1)
        );
    }
}
