import { Injectable, Inject } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import { Back } from '@humanitec/state/router';
import { ApiConfigInjectionToken } from '@humanitec/shared/tokens';
import { ApiConfig } from '@humanitec/core';

import {
    LOAD_ACTIVITIES,
    UPDATE_ACTIVITY,
    UPDATE_ACTIVITY_SUCCESS,
    CREATE_ACTIVITY,
    DELETE_ACTIVITY,
    LoadActivitiesSuccess,
    LoadActivitiesFail,
    LoadActivities,
    UpdateActivity,
    UpdateActivitySuccess,
    UpdateActivityFail,
    CreateActivity,
    DeleteActivity,
    DeleteActivitySuccess,
    DELETE_ACTIVITY_SUCCESS
} from '../actions/activities.action';
import { ActivityService } from '../../services/activity.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ActivitiesEffects {
    constructor(
        private actions$: Actions,
        private activityService: ActivityService,
        @Inject(ApiConfigInjectionToken) private apiConfig: ApiConfig
    ) {}

    @Effect()
    loadActivities$ = this.actions$.ofType(LOAD_ACTIVITIES).pipe(
        map((action: LoadActivities) => action.payload),
        switchMap((programId: number) => {
            return this.activityService
                .getActivitiesByProgramId(
                    this.apiConfig.features.activities.params,
                    { programId }
                )
                .pipe(
                    map(activities => new LoadActivitiesSuccess(activities)),
                    catchError(error => of(new LoadActivitiesFail(error)))
                );
        })
    );

    @Effect()
    createActivity$ = this.actions$.ofType(CREATE_ACTIVITY).pipe(
        map((action: CreateActivity) => action.payload),
        switchMap(activityResponse => {
            return this.activityService.createActivity(activityResponse).pipe(
                map(activity => new UpdateActivitySuccess(activity)),
                catchError(error => of(new UpdateActivityFail(error)))
            );
        })
    );

    @Effect()
    deleteActivity$ = this.actions$.ofType(DELETE_ACTIVITY).pipe(
        map((action: DeleteActivity) => action.payload),
        switchMap(activityId => {
            return this.activityService.deleteActivity(activityId).pipe(
                map(() => new DeleteActivitySuccess(activityId)),
                catchError(error => of(new UpdateActivityFail(error)))
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
        map(() => new Back()),
        catchError(error => of(new UpdateActivityFail(error)))
    );

    @Effect()
    deleteActivitySuccess$ = this.actions$.ofType(DELETE_ACTIVITY_SUCCESS).pipe(
        map(() => new Back()),
        catchError(error => of(new UpdateActivityFail(error)))
    );
}
