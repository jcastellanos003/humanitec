import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import { programsReducer, ProgramsState } from './programs.reducer';
import {
    staticConfigReducer,
    StaticConfigState
} from './static-config.reducer';

export interface DashboardState {
    programs: ProgramsState;
    staticConfig: StaticConfigState;
}

export const reducers: ActionReducerMap<DashboardState> = {
    programs: programsReducer,
    staticConfig: staticConfigReducer
};

export const FEATURE_DASHBOARD_NAME = '[DASHBOARD]';

export const getDashboardState = createFeatureSelector<DashboardState>(
    FEATURE_DASHBOARD_NAME
);
