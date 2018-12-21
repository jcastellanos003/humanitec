import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Go } from '@humanitec/state/router';

import {
    LOAD_ACTIVITIES,
    LoadActivitiesSuccess,
    LoadActivitiesFail,
    LoadActivities,
    UPDATE_ACTIVITY,
    UpdateActivity,
    UpdateActivitySuccess,
    UpdateActivityFail,
    UPDATE_ACTIVITY_SUCCESS
} from '../actions/activities.action';
import { ActivityService } from '../../services/activity.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

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

    @Effect()
    updateActivity$ = this.actions$.ofType(UPDATE_ACTIVITY).pipe(
        map((action: UpdateActivity) => action.payload),
        switchMap(activityResponse => {
            return this.activityService.updateActivity(activityResponse).pipe(
                map(activity => new UpdateActivitySuccess(activity)),
                catchError(error => of(new UpdateActivityFail(error)))
            );
        })
    );

    @Effect()
    updateActivitySuccess$ = this.actions$.ofType(UPDATE_ACTIVITY_SUCCESS).pipe(
        map(() => new Go({ path: ['/'] })),
        catchError(error => of(new UpdateActivityFail(error)))
    );
}
