import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Activity } from '@humanitec/core';

@Component({
    selector: 'activities-table',
    templateUrl: './activities-table.component.html',
    styleUrls: ['./activities-table.component.scss']
})
export class ActivitiesTableComponent {
    @Input()
    activities: Activity[];
    @Input()
    tableConfig: any;
    @Output()
    editActivity = new EventEmitter<Activity>();

    get hasActivities(): boolean {
        return this.activities && this.activities.length > 0;
    }

    get columns(): Array<string> {
        return Object.getOwnPropertyNames(this.tableConfig);
    }

    onEditActivity(event: Activity): void {
        this.editActivity.emit(event);
    }

    columnValue(columnName: string): string {
        return this.getColumnData(columnName).label;
    }

    actionColumn(columnName: string): string {
        return this.getColumnData(columnName).action;
    }

    private getColumnData(columnName: string): any {
        return this.tableConfig[columnName];
    }
}
