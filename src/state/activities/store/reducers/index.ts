import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { activityReducer, ActivityState } from './activities.reducer';

export interface ActivitiesState {
    activity: ActivityState;
}

export const reducers: ActionReducerMap<ActivitiesState> = {
    activity: activityReducer
};

export const FEATURE_ACTIVITIES_NAME = '[ACTIVITIES]';

export const getActivitiesState = createFeatureSelector<ActivitiesState>(
    FEATURE_ACTIVITIES_NAME
);
