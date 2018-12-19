import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CdkTableModule } from '@angular/cdk/table';

import { MatTableModule } from '@angular/material';

import { HumanitecSharedModule } from '@humanitec/shared';
import { HumanitecActivitiesStateModule } from '@humanitec/state/activities';

import { containers, ActivityListLayoutComponent } from './containers';
import { components } from './components';
import { guards, ActivitiesGuard } from './guards';

export const ROUTES: Routes = [
    {
        path: 'list',
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
        HumanitecActivitiesStateModule
    ],
    providers: guards
})
export class HumanitecActivitiesModule {}
