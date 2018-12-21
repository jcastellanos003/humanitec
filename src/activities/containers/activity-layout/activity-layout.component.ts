import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import {
    ActivitiesState,
    getSelectedActivity
} from '@humanitec/state/activities';
import { Activity } from '@humanitec/core';

import { Observable } from 'rxjs';

@Component({
    selector: 'activity-layout',
    templateUrl: './activity-layout.component.html',
    styleUrls: ['./activity-layout.component.scss']
})
export class ActivityLayoutComponent implements OnInit {
    activity$: Observable<Activity>;

    constructor(private store: Store<ActivitiesState>) {}

    ngOnInit() {
        this.activity$ = this.store.select(getSelectedActivity);
    }

    onCreateActivity(activity: Activity) {
        console.log('creating activity');
    }

    onUpdateActivity(activity: Activity) {
        console.log('updating activity');
    }

    onDeleteActivity(activity: Activity) {
        console.log('deleting activity');
    }
}
