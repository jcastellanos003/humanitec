import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

import { containers, DashboardLayoutComponent } from './containers';

export const ROUTES: Routes = [
    {
        path: '',
        component: DashboardLayoutComponent
    }
];

@NgModule({
    declarations: [...containers],
    imports: [CommonModule, RouterModule.forChild(ROUTES)]
})
export class HumanitecDashboardModule {}
