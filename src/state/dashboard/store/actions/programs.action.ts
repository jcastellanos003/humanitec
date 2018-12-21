import { Action } from '@ngrx/store';

import { Program } from '@humanitec/core';

export const LOAD_PROGRAMS = '[Dashboard][Load_Programs]';
export const LOAD_PROGRAMS_SUCCESS = '[Dashboard][Load_Programs_Success]';
export const LOAD_PROGRAMS_FAIL = '[Dashboard][Load_Programs_Fail]';

export class LoadPrograms implements Action {
    readonly type = LOAD_PROGRAMS;
}

export class LoadProgramsSuccess implements Action {
    readonly type = LOAD_PROGRAMS_SUCCESS;
    constructor(public payload: Program[]) {}
}

export class LoadProgramsFail implements Action {
    readonly type = LOAD_PROGRAMS_FAIL;
    constructor(public payload: any) {}
}

export type ProgramsAction =
    | LoadPrograms
    | LoadProgramsSuccess
    | LoadProgramsFail;
