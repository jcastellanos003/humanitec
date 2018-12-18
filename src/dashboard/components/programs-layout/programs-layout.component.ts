import { Component, Input } from '@angular/core';

import { Program } from '@humanitec/core';

@Component({
    selector: 'programs-layout',
    templateUrl: './programs-layout.component.html',
    styleUrls: ['./programs-layout.component.scss']
})
export class ProgramsLayoutComponent {
    @Input() programs: Array<Program>;

    get title(): string {
        return `Programs (${this.programs.length})`;
    }
}
