import { createSelector } from '@ngrx/store';

import { getDashboardState, DashboardState } from '../reducers';
import {
    getStaticConfigDataState,
    getStaticConfigLoadedState,
    getStaticConfigLoadingState
} from '../reducers/static-config.reducer';

export const getStaticConfigState = createSelector(
    getDashboardState,
    (state: DashboardState) => state.staticConfig
);

export const getStaticConfig = createSelector(
    getStaticConfigState,
    getStaticConfigDataState
);
export const getStaticConfigLoaded = createSelector(
    getStaticConfigState,
    getStaticConfigLoadedState
);
export const getStaticConfigLoading = createSelector(
    getStaticConfigState,
    getStaticConfigLoadingState
);
