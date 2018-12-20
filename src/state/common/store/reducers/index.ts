import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { programsReducer, ProgramsState } from './programs.reducer';

export interface CommonState {
    programs: ProgramsState;
}

export const reducers: ActionReducerMap<CommonState> = {
    programs: programsReducer
};

export const FEATURE_COMMON_NAME = '[COMMON]';

export const getCommonState = createFeatureSelector<CommonState>(
    FEATURE_COMMON_NAME
);
