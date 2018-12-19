import { Program } from '@humanitec/core';
import { parseArrayToEntities } from '@humanitec/utils';

import {
    ProgramsAction,
    LOAD_PROGRAMS,
    LOAD_PROGRAMS_FAIL,
    LOAD_PROGRAMS_SUCCESS
} from '../actions/programs.action';

export interface ProgramsState {
    entities: { [id: number]: Program };
    loaded: boolean;
    loading: boolean;
}

export const initialState: ProgramsState = {
    entities: {},
    loaded: false,
    loading: false
};

export function programsReducer(
    state: ProgramsState = initialState,
    action: ProgramsAction
): ProgramsState {
    switch (action.type) {
        case LOAD_PROGRAMS:
            return {
                ...state,
                loading: true
            };

        case LOAD_PROGRAMS_SUCCESS:
            const programs = action.payload;

            const entities = parseArrayToEntities<Program>(
                programs,
                state.entities
            );

            return {
                ...state,
                loading: false,
                loaded: true,
                entities
            };

        case LOAD_PROGRAMS_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false
            };
    }

    return state;
}

export const getProgramsEntitiesState = (state: ProgramsState) =>
    state.entities;
export const getProgramsLoadingState = (state: ProgramsState) => state.loading;
export const getProgramsLoadedState = (state: ProgramsState) => state.loaded;
