import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Activity, Program, AppModulesConfig } from '@humanitec/core';

@Component({
    selector: 'program-details',
    templateUrl: './program-details.component.html',
    styleUrls: ['./program-details.component.scss']
})
export class ProgramDetailsComponent {
    @Input()
    activities: Activity[];
    @Input()
    program: Program;
    @Input()
    staticConfig: AppModulesConfig;
    @Output()
    activitySelected = new EventEmitter<Activity>();
    @Output()
    createActivity = new EventEmitter<Program>();

    get programTitle(): string {
        return this.program.name;
    }

    get tableConfig(): any {
        return this.staticConfig.dashboard.activityList.tableConfig;
    }

    onEditActivity(event: Activity) {
        this.activitySelected.emit(event);
    }

    onCreateActivity() {
        this.createActivity.emit(this.program);
    }
}
