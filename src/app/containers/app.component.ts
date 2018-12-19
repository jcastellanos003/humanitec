import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    showLoader = true;

    onActivate(): void {
        this.showLoader = !this.showLoader;
    }
}
