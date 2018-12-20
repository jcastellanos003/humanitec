import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Program } from '@humanitec/core';
import { CommonState, getAllPrograms } from '@humanitec/state/common';
import { RouterState, Go } from '@humanitec/state/router';

import { Observable } from 'rxjs';

@Component({
    selector: 'dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent implements OnInit {
    programs$: Observable<Program[]>;

    constructor(private store: Store<CommonState | RouterState>) {}

    ngOnInit() {
        this.programs$ = this.store.select(getAllPrograms);
    }

    onProgramSelected(program: Program): void {
        this.store.dispatch(
            new Go({
                path: ['/activities/list/', program.id]
            })
        );
    }
}
