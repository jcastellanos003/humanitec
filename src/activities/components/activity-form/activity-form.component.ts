import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE
} from '@angular/material/core';

import { Activity } from '@humanitec/core';
import { DEFAULT_DATE_FORMAT } from '@humanitec/utils';

import * as moment from 'moment';

export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'DD/MM/YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};

@Component({
    selector: 'activity-form',
    templateUrl: './activity-form.component.html',
    styleUrls: ['./activity-form.component.scss'],
    providers: [
        {
            provide: DateAdapter,
            useClass: MomentDateAdapter,
            deps: [MAT_DATE_LOCALE]
        },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ]
})
export class ActivityFormComponent implements OnInit {
    @Input()
    activity: Activity;
    @Output()
    create = new EventEmitter<Activity>();
    @Output()
    update = new EventEmitter<Activity>();
    @Output()
    delete = new EventEmitter<Activity>();

    activityForm: FormGroup = this.fb.group({
        name: ['', [Validators.required]],
        startDate: [''],
        endDate: ['']
    });

    get isEdition(): boolean {
        return this.activity && !!this.activity.id;
    }

    constructor(private fb: FormBuilder) {}

    ngOnInit() {
        if (this.isEdition) {
            this.activityForm.controls['name'].setValue(this.activity.name);

            this.activityForm.controls['startDate'].setValue(
                moment(this.activity.startDate, DEFAULT_DATE_FORMAT)
            );

            this.activityForm.controls['endDate'].setValue(
                moment(this.activity.endDate, DEFAULT_DATE_FORMAT)
            );
        }
    }

    createActivity(form: FormGroup) {
        const { value, valid } = form;

        if (valid) {
            this.create.emit({ ...value });
        }
    }

    updateActivity(form: FormGroup) {
        const { value, valid, touched } = form;

        if (valid && touched) {
            this.update.emit({ ...value });
        }
    }

    deleteActivity(form: FormGroup) {
        const { value } = form;

        this.delete.emit({ ...value });
    }

    fieldErrored(field: string): boolean {
        return (
            !this.activityForm.get(field).valid &&
            this.activityForm.get(field).touched
        );
    }
}
