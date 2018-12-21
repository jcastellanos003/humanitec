import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import {
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
} from '@angular/material';

import { HumanitecSharedModule } from '@humanitec/shared';
import { HumanitecDashboardStateModule } from '@humanitec/state/dashboard';
import { HumanitecActivitiesStateModule } from '@humanitec/state/activities';

import {
    containers,
    DashboardLayoutComponent,
    ProgramDetailsLayoutComponent
} from './containers';
import { components } from './components';
import {
    dashboardGuards,
    ActivitiesListGuard,
    ProgramsGuard,
    StaticConfigGuard
} from './guards';

export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [ProgramsGuard],
        component: DashboardLayoutComponent
    },
    {
        path: 'program',
        canActivate: [ProgramsGuard],
        canActivateChild: [ActivitiesListGuard, StaticConfigGuard],
        children: [
            {
                path: ':programId',
                component: ProgramDetailsLayoutComponent
            }
        ]
    }
];

@NgModule({
    exports: [
        CdkTableModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule,
        MatIconModule,
        MatCardModule
    ]
})
export class HumanitecDashboardMaterialModule {}

@NgModule({
    declarations: [...containers, ...components],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        HumanitecDashboardMaterialModule,
        HumanitecSharedModule,
        HumanitecDashboardStateModule,
        HumanitecActivitiesStateModule
    ],
    providers: dashboardGuards
})
export class HumanitecDashboardModule {}
