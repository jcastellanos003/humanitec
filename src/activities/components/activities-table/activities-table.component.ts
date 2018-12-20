import { Component, Input } from '@angular/core';

import { Activity } from '@humanitec/core';

@Component({
    selector: 'activities-table',
    templateUrl: './activities-table.component.html',
    styleUrls: ['./activities-table.component.scss']
})
export class ActivitiesTableComponent {
    @Input()
    activities: Activity[];

    displayedColumns = ['id', 'name', 'startDate', 'endDate'];

    get hasActivities(): boolean {
        return this.activities && this.activities.length > 0;
    }
}
