import { createSelector } from '@ngrx/store';

import { Program } from '@humanitec/core';
import { getRouterState } from '@humanitec/state/router';

import { getCommonState, CommonState } from '../reducers';
import {
    getProgramsEntitiesState,
    getProgramsLoadedState,
    getProgramsLoadingState
} from '../reducers/programs.reducer';

export const getProgramsState = createSelector(
    getCommonState,
    (state: CommonState) => state.programs
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

export const getSelectedProgram = createSelector(
    getProgramsEntities,
    getRouterState,
    (entities, router): Program => {
        return router.state && entities[router.state.params.programId];
    }
);
