import { Component, Input } from '@angular/core';

import { Program } from '@humanitec/core';

@Component({
    selector: 'program-tile',
    templateUrl: './tile.component.html',
    styleUrls: ['./tile.component.scss']
})
export class ProgramTileComponent {
    @Input() program: Program;

    private readonly _doneStatus = 'green';

    get isDone(): boolean {
        return this.program.status === this._doneStatus;
    }

    get title(): string {
        return this.program.name;
    }
}
