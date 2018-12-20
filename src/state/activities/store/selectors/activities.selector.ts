import { createSelector } from '@ngrx/store';

import { getRouterState } from '@humanitec/state/router';
import { Activity } from '@humanitec/core';

import { getActivitiesState, ActivitiesState } from '../reducers';
import {
    getActivityListState,
    getActivityListLoadedState,
    getActivityListLoadingState
} from '../reducers/activities.reducer';

export const getActivityState = createSelector(
    getActivitiesState,
    (state: ActivitiesState) => state.activity
);

export const getActivityList = createSelector(
    getActivityState,
    getActivityListState
);

export const getActivityListLoaded = createSelector(
    getActivityState,
    getActivityListLoadedState
);

export const getActivityListLoading = createSelector(
    getActivityState,
    getActivityListLoadingState
);

export const getAllActivities = createSelector(
    getActivityList,
    entities => {
        return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
    }
);

export const getActivitiesByProgramId = createSelector(
    getAllActivities,
    getRouterState,
    (activities, router): Activity[] => {
        return (
            router.state &&
            activities.filter(
                a => a.programId === +router.state.params.programId
            )
        );
    }
);

export const getSelectedActivity = createSelector(
    getActivityList,
    getRouterState,
    (entities, router): Activity => {
        return router.state && entities[router.state.params.activityId];
    }
);
