import { Component, Input } from '@angular/core';

@Component({
    selector: 'program-tile-title',
    templateUrl: './tile-title.component.html',
    styleUrls: ['./tile-title.component.scss']
})
export class ProgramTileTitleComponent {
    @Input() title: string;
}
