import { Activity } from '@humanitec/core';
import { parseArrayToEntities } from '@humanitec/utils';

import {
    ActivitiesAction,
    LOAD_ACTIVITIES,
    LOAD_ACTIVITIES_FAIL,
    LOAD_ACTIVITIES_SUCCESS
} from '../actions/activities.action';

export interface ActivityState {
    entities: { [id: number]: Activity };
    loaded: boolean;
    loading: boolean;
}

export const initialState: ActivityState = {
    entities: {},
    loaded: false,
    loading: false
};

export function activityReducer(
    state: ActivityState = initialState,
    action: ActivitiesAction
): ActivityState {
    switch (action.type) {
        case LOAD_ACTIVITIES:
            return {
                ...state,
                loaded: false,
                loading: true
            };

        case LOAD_ACTIVITIES_SUCCESS: {
            const activities = action.payload;

            const entities = parseArrayToEntities<Activity>(
                activities,
                state.entities
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };
        }

        case LOAD_ACTIVITIES_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false
            };
    }

    return state;
}

export const getActivityListState = (state: ActivityState) => state.entities;
export const getActivityListLoadingState = (state: ActivityState) =>
    state.loading;
export const getActivityListLoadedState = (state: ActivityState) =>
    state.loaded;
