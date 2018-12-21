import { AppModulesConfig } from '@humanitec/core';

import {
    StaticConfigAction,
    LOAD_STATIC_CONFIG,
    LOAD_STATIC_CONFIG_FAIL,
    LOAD_STATIC_CONFIG_SUCCESS
} from '../actions/static-config.action';

export interface StaticConfigState {
    data: AppModulesConfig;
    loaded: boolean;
    loading: boolean;
}

export const initialState: StaticConfigState = {
    data: <any>{},
    loaded: false,
    loading: false
};

export function staticConfigReducer(
    state: StaticConfigState = initialState,
    action: StaticConfigAction
): StaticConfigState {
    switch (action.type) {
        case LOAD_STATIC_CONFIG:
            return {
                ...state,
                loading: true
            };

        case LOAD_STATIC_CONFIG_SUCCESS:
            const data = action.payload;

            return {
                ...state,
                loading: false,
                loaded: true,
                data
            };

        case LOAD_STATIC_CONFIG_FAIL:
            return {
                ...state,
                loading: false,
                loaded: false
            };
    }

    return state;
}

export const getStaticConfigDataState = (state: StaticConfigState) =>
    state.data;
export const getStaticConfigLoadingState = (state: StaticConfigState) =>
    state.loading;
export const getStaticConfigLoadedState = (state: StaticConfigState) =>
    state.loaded;
