import { Component } from '@angular/core';

import { Program } from '@humanitec/core';

@Component({
    selector: 'dashboard-layout',
    templateUrl: './dashboard-layout.component.html',
    styleUrls: ['./dashboard-layout.component.scss']
})
export class DashboardLayoutComponent {
    public programs: Array<Program> = [
        {
            budget: 2000,
            name: 'Hamzas Prog',
            createDate: '2018-02-06T12:21:45+01:00',
            id: 7,
            status: 'green'
        },
        {
            budget: 5000,
            name: 'Another stuff',
            createDate: '2018-02-06T12:21:45+01:00',
            id: 8,
            status: ''
        },
        {
            budget: 400,
            name: 'Lalapp',
            createDate: '2018-02-06T12:21:45+01:00',
            id: 9,
            status: ''
        }
    ];
}
