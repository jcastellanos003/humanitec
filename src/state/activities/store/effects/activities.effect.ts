import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import {
    LOAD_ACTIVITIES,
    LoadActivitiesSuccess,
    LoadActivitiesFail,
    LoadActivities
} from '../actions/activities.action';
import { ActivityService } from '../../services/activity.service';

@Injectable()
export class ActivitiesEffects {
    constructor(
        private actions$: Actions,
        private activityService: ActivityService
    ) {}

    @Effect()
    loadActivities$ = this.actions$.ofType(LOAD_ACTIVITIES).pipe(
        map((action: LoadActivities) => action.payload),
        switchMap((programId: number) => {
            return this.activityService
                .getActivitiesByProgramId(programId)
                .pipe(
                    map(activities => new LoadActivitiesSuccess(activities)),
                    catchError(error => of(new LoadActivitiesFail(error)))
                );
        })
    );
}
