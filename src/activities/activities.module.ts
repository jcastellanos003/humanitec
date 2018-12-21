import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
} from '@angular/material';

import { HumanitecSharedModule } from '@humanitec/shared';
import { HumanitecActivitiesStateModule } from '@humanitec/state/activities';

import { containers, ActivityLayoutComponent } from './containers';
import { components } from './components';
import { activitiesGuards, ActivityExistsGuard } from './guards';

export const ROUTES: Routes = [
    {
        path: 'new',
        component: ActivityLayoutComponent
    },
    {
        path: ':activityId',
        canActivate: [ActivityExistsGuard],
        component: ActivityLayoutComponent
    }
];

@NgModule({
    exports: [
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatDatepickerModule,
        MatNativeDateModule
    ]
})
export class HumanitecActivitiesMaterialModule {}

@NgModule({
    declarations: [...containers, ...components],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        ReactiveFormsModule,
        HumanitecActivitiesMaterialModule,
        HumanitecSharedModule,
        HumanitecActivitiesStateModule
    ],
    providers: activitiesGuards
})
export class HumanitecActivitiesModule {}
