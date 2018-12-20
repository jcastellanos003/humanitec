import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatTableModule } from '@angular/material';

import { HumanitecSharedModule } from '@humanitec/shared';
import { sharedGuards, ProgramsGuard } from '@humanitec/shared/guards';
import { HumanitecActivitiesStateModule } from '@humanitec/state/activities';
import { HumanitecCommonStateModule } from '@humanitec/state/common';

import { containers, ActivityListLayoutComponent } from './containers';
import { components } from './components';
import { activitiesGuards, ActivitiesGuard } from './guards';

export const ROUTES: Routes = [
    {
        path: 'list',
        canActivate: [ProgramsGuard],
        canActivateChild: [ActivitiesGuard],
        children: [
            {
                path: ':programId',
                component: ActivityListLayoutComponent
            }
        ]
    }
];

@NgModule({
    exports: [CdkTableModule, MatTableModule]
})
export class HumanitecActivitiesMaterialModule {}

@NgModule({
    declarations: [...containers, ...components],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        HumanitecActivitiesMaterialModule,
        HumanitecSharedModule,
        HumanitecActivitiesStateModule,
        HumanitecCommonStateModule
    ],
    providers: [...sharedGuards, ...activitiesGuards]
})
export class HumanitecActivitiesModule {}
