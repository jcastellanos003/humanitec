import { Action } from '@ngrx/store';

import { Activity } from '@humanitec/core';

export const LOAD_ACTIVITIES = '[Activities][Load_Activities]';
export const LOAD_ACTIVITIES_SUCCESS = '[Activities][Load_Activities_Success]';
export const LOAD_ACTIVITIES_FAIL = '[Activities][Load_Activities_Fail]';

export const CREATE_ACTIVITY = '[Activities][Create_Activity]';

export const DELETE_ACTIVITY = '[Activities][Delete_Activity]';
export const DELETE_ACTIVITY_SUCCESS = '[Activities][Delete_Activity_Success]';

export const UPDATE_ACTIVITY = '[Activities][Update_Activity]';
export const UPDATE_ACTIVITY_SUCCESS = '[Activities][Update_Activity_Success]';
export const UPDATE_ACTIVITY_FAIL = '[Activities][Update_Activity_Fail]';

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

export class CreateActivity implements Action {
    readonly type = CREATE_ACTIVITY;
    constructor(public payload: Activity) {}
}

export class DeleteActivity implements Action {
    readonly type = DELETE_ACTIVITY;
    constructor(public payload: number) {}
}

export class DeleteActivitySuccess implements Action {
    readonly type = DELETE_ACTIVITY_SUCCESS;
    constructor(public payload: number) {}
}

export class UpdateActivity implements Action {
    readonly type = UPDATE_ACTIVITY;
    constructor(public payload: Activity) {}
}

export class UpdateActivitySuccess implements Action {
    readonly type = UPDATE_ACTIVITY_SUCCESS;
    constructor(public payload: Activity) {}
}

export class UpdateActivityFail implements Action {
    readonly type = UPDATE_ACTIVITY_FAIL;
    constructor(public payload: any) {}
}

export type ActivitiesAction =
    | LoadActivities
    | LoadActivitiesSuccess
    | LoadActivitiesFail
    | CreateActivity
    | DeleteActivity
    | DeleteActivitySuccess
    | UpdateActivity
    | UpdateActivitySuccess
    | UpdateActivityFail;
