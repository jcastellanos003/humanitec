import { Action } from '@ngrx/store';

import { Activity } from '@humanitec/core';

export const LOAD_ACTIVITIES = '[Activities][Load_Activities]';
export const LOAD_ACTIVITIES_SUCCESS = '[Activities][Load_Activities_Success]';
export const LOAD_ACTIVITIES_FAIL = '[Activities][Load_Activities_Fail]';

export class LoadActivities implements Action {
    readonly type = LOAD_ACTIVITIES;
    constructor(public payload: number) {}
}

export class LoadActivitiesSuccess implements Action {
    readonly type = LOAD_ACTIVITIES_SUCCESS;
    constructor(public payload: Activity[]) {}
}

export class LoadActivitiesFail implements Action {
    readonly type = LOAD_ACTIVITIES_FAIL;
    constructor(public payload: any) {}
}

export type ActivitiesAction =
    | LoadActivities
    | LoadActivitiesSuccess
    | LoadActivitiesFail;
