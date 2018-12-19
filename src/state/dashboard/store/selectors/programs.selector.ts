import { createSelector } from '@ngrx/store';

import { getDashboardState, DashboardState } from '../reducers';
import {
    getProgramsEntitiesState,
    getProgramsLoadedState,
    getProgramsLoadingState
} from '../reducers/programs.reducer';

export const getProgramsState = createSelector(
    getDashboardState,
    (state: DashboardState) => state.programs
);

export const getProgramsEntities = createSelector(
    getProgramsState,
    getProgramsEntitiesState
);

export const getProgramsLoaded = createSelector(
    getProgramsState,
    getProgramsLoadedState
);

export const getProgramsLoading = createSelector(
    getProgramsState,
    getProgramsLoadingState
);

export const getAllPrograms = createSelector(
    getProgramsEntities,
    entities => {
        return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
    }
);
