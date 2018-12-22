import { TestBed, async, ComponentFixture } from '@angular/core/testing';

import { MatCardModule, MatIconModule } from '@angular/material';

import { HumanitecSharedModule } from '@humanitec/shared';

import { ProgramTileComponent } from './tile.component';
import { ProgramTileTitleComponent } from '../tile-title/tile-title.component';
import { ProgramTileFooterComponent } from '../tile-footer/tile-footer.component';
import { Program } from 'src/core/models';

describe('TileComponent', () => {
    let helper: Helper;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [MatCardModule, MatIconModule, HumanitecSharedModule],
            declarations: [
                ProgramTileComponent,
                ProgramTileTitleComponent,
                ProgramTileFooterComponent
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        helper = new Helper();
    });

    it('should create the tile component', async(() => {
        const tileComponent = helper.component;

        expect(tileComponent).toBeTruthy();
    }));

    it('should app loader be hidden by default', async(() => {
        const tileComponent = helper.component;

        expect(tileComponent.showLoader).toBeFalsy();
    }));

    it('should title be the name of the program', async(() => {
        const tileComponent = helper.component;

        tileComponent.program = helper.program;

        helper.detectChanges();

        expect(tileComponent.title).toEqual(helper.program.name);
    }));

    it('should app loader be visible when program is selected', async(() => {
        const tileComponent = helper.component;

        tileComponent.program = helper.program;

        helper.detectChanges();

        tileComponent.onSelected();

        expect(tileComponent.showLoader).toBeTruthy();
    }));

    it('should emit the program when is selected', async(() => {
        const tileComponent = helper.component;

        tileComponent.program = helper.program;

        helper.detectChanges();

        tileComponent.onSelected();

        expect(helper.spySelectedEmitter).toHaveBeenCalledTimes(1);
        expect(helper.spySelectedEmitter).toHaveBeenCalledWith(helper.program);
    }));

    describe('Done Mark', () => {
        it('should done mark be truthy when status is green', async(() => {
            const tileComponent = helper.component;

            tileComponent.program = helper.programGreen;

            helper.detectChanges();

            expect(tileComponent.isDone).toBeTruthy();
        }));

        it('should done mark be falsy when status is different to green', async(() => {
            const tileComponent = helper.component;

            tileComponent.program = helper.program;

            helper.detectChanges();

            expect(tileComponent.isDone).toBeFalsy();
        }));
    });
});

class Helper {
    private fixture: ComponentFixture<ProgramTileComponent>;
    private componentRef: ProgramTileComponent;

    public spySelectedEmitter: jasmine.Spy;

    constructor() {
        this.fixture = TestBed.createComponent(ProgramTileComponent);
        this.componentRef = this.fixture.componentInstance;
        this.spySelectedEmitter = spyOn(
            this.component.selected,
            'emit'
        ).and.callThrough();
    }

    get component(): ProgramTileComponent {
        return this.componentRef;
    }

    get programGreen(): Program {
        return {
            id: 1,
            budget: 100,
            create_date: '01/01/2019',
            name: 'Program test',
            status: 'green',
            url: 'http://program.test'
        };
    }

    get program(): Program {
        return {
            ...this.programGreen,
            status: ''
        };
    }

    detectChanges(): void {
        this.fixture.detectChanges();
    }
}
