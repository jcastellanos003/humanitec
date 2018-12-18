import { Component, Input } from '@angular/core';

import { Program } from '@humanitec/core';

@Component({
    selector: 'program-tile-footer',
    templateUrl: './tile-footer.component.html',
    styleUrls: ['./tile-footer.component.scss']
})
export class ProgramTileFooterComponent {
    @Input() program: Program;

    get budget(): number {
        return this.program.budget || 0;
    }

    get date(): Date {
        return new Date(this.program.createDate);
    }
}
