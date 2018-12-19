import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { Activity } from '@humanitec/core';
import { ActivitiesState, getAllActivities } from '@humanitec/state/activities';

import { Observable } from 'rxjs';

@Component({
    selector: 'activity-list-layout',
    templateUrl: './activity-list-layout.component.html',
    styleUrls: ['./activity-list-layout.component.scss']
})
export class ActivityListLayoutComponent implements OnInit {
    activities$: Observable<Activity[]>;

    constructor(private store: Store<ActivitiesState>) {}

    ngOnInit() {
        this.activities$ = this.store.select(getAllActivities);
    }
}
