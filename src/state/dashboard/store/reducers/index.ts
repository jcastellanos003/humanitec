import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { programsReducer, ProgramsState } from './programs.reducer';

export interface DashboardState {
    programs: ProgramsState;
}

export const reducers: ActionReducerMap<DashboardState> = {
    programs: programsReducer
};

export const FEATURE_DASHBOARD_NAME = '[DASHBOARD]';

export const getDashboardState = createFeatureSelector<DashboardState>(
    FEATURE_DASHBOARD_NAME
);
