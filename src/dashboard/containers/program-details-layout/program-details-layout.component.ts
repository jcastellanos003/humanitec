import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Activity, Program, AppModulesConfig } from '@humanitec/core';
import {
    ActivitiesState,
    getActivitiesByProgramId
} from '@humanitec/state/activities';
import {
    DashboardState,
    getSelectedProgram,
    getStaticConfig
} from '@humanitec/state/dashboard';
import { RouterState, Go } from '@humanitec/state/router';

import { Observable } from 'rxjs';

@Component({
    selector: 'program-details-layout',
    templateUrl: './program-details-layout.component.html'
})
export class ProgramDetailsLayoutComponent implements OnInit {
    activities$: Observable<Activity[]>;
    program$: Observable<Program>;
    staticConfig$: Observable<AppModulesConfig>;

    constructor(
        private store: Store<ActivitiesState | DashboardState | RouterState>
    ) {}

    ngOnInit() {
        this.activities$ = this.store.select(getActivitiesByProgramId);
        this.program$ = this.store.select(getSelectedProgram);
        this.staticConfig$ = this.store.select(getStaticConfig);
    }

    onActivitySelected(activity: Activity): void {
        this.store.dispatch(
            new Go({
                path: ['/activity', activity.id]
            })
        );
    }

    onCreateActivity(): void {
        this.store.dispatch(
            new Go({
                path: ['/activity/new']
            })
        );
    }
}
