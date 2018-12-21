import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {
    DateAdapter,
    MAT_DATE_FORMATS,
    MAT_DATE_LOCALE
} from '@angular/material/core';

import { Activity } from '@humanitec/core';
import {
    DEFAULT_DATE_FORMAT,
    DEFAULT_MATERIAL_DATE_FORMAT
} from '@humanitec/utils';

import * as moment from 'moment';

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
        { provide: MAT_DATE_FORMATS, useValue: DEFAULT_MATERIAL_DATE_FORMAT }
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
                moment(this.activity.expected_start_date, DEFAULT_DATE_FORMAT)
            );

            this.activityForm.controls['endDate'].setValue(
                moment(this.activity.expected_end_date, DEFAULT_DATE_FORMAT)
            );
        }
    }

    createActivity(form: FormGroup) {
        const { value, valid } = form;

        if (valid) {
            this.create.emit(this.getEntityToPost(value));
        }
    }

    updateActivity(form: FormGroup) {
        const { value, valid, touched } = form;

        if (valid && touched) {
            this.update.emit(this.getEntityToPost(value));
        }
    }

    deleteActivity(form: FormGroup) {
        const { value } = form;

        this.delete.emit(this.getEntityToPost(value));
    }

    fieldErrored(field: string): boolean {
        return (
            !this.activityForm.get(field).valid &&
            this.activityForm.get(field).touched
        );
    }

    private getEntityToPost(formValue: any): Activity {
        const { id, workflowlevel1 } = this.activity;

        return {
            id,
            workflowlevel1,
            ...formValue
        };
    }
}
