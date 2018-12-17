import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './containers/app.component';
import { NotFoundComponent } from './components/not-found.component';

export const ROUTES: Routes = [
    {
        path: '',
        loadChildren: '../dashboard/dashboard.module#HumanitecDashboardModule'
    },
    { path: '', pathMatch: 'full', redirectTo: '/' },
    { path: '**', component: NotFoundComponent }
];

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class HumanitecAppModule {}
