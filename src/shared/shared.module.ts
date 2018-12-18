import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { components } from './components';

const sharedMembers = [...components];

@NgModule({
    declarations: sharedMembers,
    imports: [CommonModule],
    exports: sharedMembers
})
export class HumanitecSharedModule {}
