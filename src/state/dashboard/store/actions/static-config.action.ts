import { Action } from '@ngrx/store';

import { AppModulesConfig } from '@humanitec/core';

export const LOAD_STATIC_CONFIG = '[Dashboard][Load_Static_Config]';
export const LOAD_STATIC_CONFIG_SUCCESS =
    '[Dashboard][Load_Static_Config_Success]';
export const LOAD_STATIC_CONFIG_FAIL = '[Dashboard][Load_Static_Config_Fail]';

export class LoadStaticConfig implements Action {
    readonly type = LOAD_STATIC_CONFIG;
}

export class LoadStaticConfigSuccess implements Action {
    readonly type = LOAD_STATIC_CONFIG_SUCCESS;
    constructor(public payload: AppModulesConfig) {}
}

export class LoadStaticConfigFail implements Action {
    readonly type = LOAD_STATIC_CONFIG_FAIL;
    constructor(public payload: any) {}
}

export type StaticConfigAction =
    | LoadStaticConfig
    | LoadStaticConfigSuccess
    | LoadStaticConfigFail;
