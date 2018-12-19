import { Component, Input, OnInit } from '@angular/core';

import { Activity } from '@humanitec/core';

@Component({
    selector: 'activities-table',
    templateUrl: './activities-table.component.html',
    styleUrls: ['./activities-table.component.scss']
})
export class ActivitiesTableComponent implements OnInit {
    @Input()
    activities: Activity[];

    displayedColumns: Array<string>;

    get hasActivities(): boolean {
        return this.activities && this.activities.length > 0;
    }

    ngOnInit() {
        if (this.hasActivities) {
            this.displayedColumns = Object.getOwnPropertyNames(
                this.activities[0]
            );
        }
    }
}
