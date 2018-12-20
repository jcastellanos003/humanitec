import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { MatIconModule, MatCardModule } from '@angular/material';

import { HumanitecSharedModule } from '@humanitec/shared';
import { sharedGuards, ProgramsGuard } from '@humanitec/shared/guards';
import { HumanitecCommonStateModule } from '@humanitec/state/common';

import { containers, DashboardLayoutComponent } from './containers';
import { components } from './components';

export const ROUTES: Routes = [
    {
        path: '',
        canActivate: [ProgramsGuard],
        component: DashboardLayoutComponent
    }
];

@NgModule({
    exports: [MatIconModule, MatCardModule]
})
export class HumanitecDashboardMaterialModule {}

@NgModule({
    declarations: [...containers, ...components],
    imports: [
        CommonModule,
        RouterModule.forChild(ROUTES),
        HumanitecDashboardMaterialModule,
        HumanitecSharedModule,
        HumanitecCommonStateModule
    ],
    providers: sharedGuards
})
export class HumanitecDashboardModule {}
