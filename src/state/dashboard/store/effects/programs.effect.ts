import { Injectable } from '@angular/core';

import { Actions, Effect } from '@ngrx/effects';

import {
    LOAD_PROGRAMS,
    LoadProgramsSuccess,
    LoadProgramsFail
} from '../actions/programs.action';
import { ProgramsService } from '../../services/programs.service';

import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class ProgramsEffects {
    constructor(
        private actions$: Actions,
        private programsService: ProgramsService
    ) {}

    @Effect()
    loadPrograms$ = this.actions$.ofType(LOAD_PROGRAMS).pipe(
        switchMap(() => {
            return this.programsService.getPrograms().pipe(
                map(programs => new LoadProgramsSuccess(programs)),
                catchError(error => of(new LoadProgramsFail(error)))
            );
        })
    );
}
