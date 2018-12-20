import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { HumanitecSharedModule } from '@humanitec/shared';

import { AppComponent } from './app.component';
import { HeaderComponent } from '../components';

describe('AppComponent', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterTestingModule, HumanitecSharedModule],
            declarations: [AppComponent, HeaderComponent]
        }).compileComponents();
    }));

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;

        expect(app).toBeTruthy();
    }));
});
