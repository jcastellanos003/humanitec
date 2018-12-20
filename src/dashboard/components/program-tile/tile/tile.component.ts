import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Program } from '@humanitec/core';

@Component({
    selector: 'program-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss']
})
export class ProgramTileComponent {
    @Input()
    program: Program;
    @Output()
    selected = new EventEmitter<Program>();

    showLoader = false;

    private readonly doneStatus = 'green';

    get isDone(): boolean {
        return this.program.status === this.doneStatus;
    }

    get title(): string {
        return this.program.name;
    }

    onSelected(): void {
        this.showLoader = !this.showLoader;
        this.selected.emit(this.program);
    }
}
