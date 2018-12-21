import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import {
    ActivitiesState,
    getSelectedActivity,
    UpdateActivity
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

    showLoader = false;

    constructor(private store: Store<ActivitiesState>) {}

    ngOnInit() {
        this.activity$ = this.store.select(getSelectedActivity);
    }

    onCreateActivity(activity: Activity) {
        this.toggleLoader();
        console.log('creating activity', activity);
    }

    onUpdateActivity(activity: Activity) {
        this.toggleLoader();
        this.store.dispatch(new UpdateActivity(activity));
    }

    onDeleteActivity(activity: Activity) {
        this.toggleLoader();
        console.log('deleting activity', activity);
    }

    toggleLoader(): void {
        this.showLoader = !this.showLoader;
    }
}
