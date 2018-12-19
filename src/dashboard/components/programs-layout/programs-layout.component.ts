import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Program } from '@humanitec/core';

@Component({
    selector: 'programs-layout',
    templateUrl: './programs-layout.component.html',
    styleUrls: ['./programs-layout.component.scss']
})
export class ProgramsLayoutComponent {
    @Input()
    programs: Array<Program>;
    @Output()
    programSelected = new EventEmitter<Program>();

    get title(): string {
        return `Programs (${this.programs.length})`;
    }

    onProgramSelected(event: Program) {
        this.programSelected.emit(event);
    }
}
