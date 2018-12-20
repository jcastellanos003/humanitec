import { Component, Input } from '@angular/core';

import { Activity, Program } from '@humanitec/core';

@Component({
    selector: 'activities-layout',
    templateUrl: './activities-layout.component.html',
    styleUrls: ['./activities-layout.component.scss']
})
export class ActivitiesLayoutComponent {
    @Input()
    activities: Activity[];
    @Input()
    program: Program;

    get programTitle(): string {
        return this.program.name;
    }
}
