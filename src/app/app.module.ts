import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { HumanitecCoreModule, AppConfig } from '@humanitec/core';

import { AppComponent } from './containers/app.component';
import { NotFoundComponent } from './components/not-found.component';

import { environment } from '../environments/environment';

export const ROUTES: Routes = [
    {
        path: '',
        loadChildren: '../dashboard/dashboard.module#HumanitecDashboardModule'
    },
    { path: '', pathMatch: 'full', redirectTo: '/' },
    { path: '**', component: NotFoundComponent }
];

export const APP_CONFIG: AppConfig = {
    appConfigUrl: environment.APP_CONFIG_URL,
    assetsPath: environment.ASSETS_PATH
};

@NgModule({
    declarations: [AppComponent, NotFoundComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule.forRoot(ROUTES),
        HumanitecCoreModule.forRoot(APP_CONFIG)
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class HumanitecAppModule {}
