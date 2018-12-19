import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';

import { StoreModule, MetaReducer } from '@ngrx/store';
import {
    StoreRouterConnectingModule,
    RouterStateSerializer
} from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { storeFreeze } from 'ngrx-store-freeze';

import { reducers, effects, CustomSerializer } from '@humanitec/state/router';
import { HumanitecCoreModule, AppConfig } from '@humanitec/core';

import { AppComponent } from './containers/app.component';
import { components, NotFoundComponent } from './components';

import { environment } from '../environments/environment';

export const META_REDUCERS: MetaReducer<any>[] = !environment.production
    ? [storeFreeze]
    : [];

export const ROUTES: Routes = [
    {
        path: '',
        loadChildren: '../dashboard/dashboard.module#HumanitecDashboardModule'
    },
    {
        path: 'activities',
        loadChildren:
            '../activities/activities.module#HumanitecActivitiesModule'
    },
    { path: '', pathMatch: 'full', redirectTo: '/' },
    { path: '**', component: NotFoundComponent }
];

export const APP_CONFIG: AppConfig = {
    appConfigUrl: environment.APP_CONFIG_URL,
    assetsPath: environment.ASSETS_PATH
};

@NgModule({
    declarations: [AppComponent, ...components],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        StoreModule.forRoot(reducers, { metaReducers: META_REDUCERS }),
        EffectsModule.forRoot(effects),
        RouterModule.forRoot(ROUTES),
        StoreRouterConnectingModule.forRoot(),
        HumanitecCoreModule.forRoot(APP_CONFIG),
        environment.production ? [] : StoreDevtoolsModule.instrument()
    ],
    providers: [
        {
            provide: RouterStateSerializer,
            useClass: CustomSerializer
        }
    ],
    bootstrap: [AppComponent]
})
export class HumanitecAppModule {}
