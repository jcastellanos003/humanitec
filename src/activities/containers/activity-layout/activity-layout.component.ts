import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import {
    ActivitiesState,
    getSelectedActivity,
    UpdateActivity,
    getProgramUrl,
    CreateActivity,
    DeleteActivity
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
    programUrl$: Observable<string>;

    showLoader = false;

    constructor(private store: Store<ActivitiesState>) {}

    ngOnInit() {
        this.activity$ = this.store.select(getSelectedActivity);
        this.programUrl$ = this.store.select(getProgramUrl);
    }

    onCreateActivity(activity: Activity) {
        this.toggleLoader();
        this.store.dispatch(new CreateActivity(activity));
    }

    onUpdateActivity(activity: Activity) {
        this.toggleLoader();
        this.store.dispatch(new UpdateActivity(activity));
    }

    onDeleteActivity(activityId: number) {
        this.toggleLoader();
        this.store.dispatch(new DeleteActivity(activityId));
    }

    toggleLoader(): void {
        this.showLoader = !this.showLoader;
    }
}
