import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Activity, Program } from '@humanitec/core';
import {
    ActivitiesState,
    getActivitiesByProgramId
} from '@humanitec/state/activities';
import { CommonState, getSelectedProgram } from '@humanitec/state/common';

import { Observable } from 'rxjs';

@Component({
    selector: 'activity-list-layout',
    templateUrl: './activity-list-layout.component.html',
    styleUrls: ['./activity-list-layout.component.scss']
})
export class ActivityListLayoutComponent implements OnInit {
    activities$: Observable<Activity[]>;
    program$: Observable<Program>;

    constructor(private store: Store<ActivitiesState | CommonState>) {}

    ngOnInit() {
        this.activities$ = this.store.select(getActivitiesByProgramId);
        this.program$ = this.store.select(getSelectedProgram);
    }
}
