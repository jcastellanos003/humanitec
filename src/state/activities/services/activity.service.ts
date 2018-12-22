import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Activity } from '@humanitec/core';
import {
    DEFAULT_DATE_FORMAT,
    setFromLocalStorage,
    getFromLocalStorage,
    removeFromLocalStorage
} from '@humanitec/utils';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable()
export class ActivityService {
    constructor(
        private http: HttpClient,
        private storageKey: string,
        private endpoint: string
    ) {}

    getActivitiesByProgramId(
        paramsConfig: any,
        paramValues: { programId: number }
    ): Observable<Activity[]> {
        let params = new HttpParams();

        Object.getOwnPropertyNames(paramsConfig).forEach(param => {
            const value = paramValues[paramsConfig[param].toString()];
            params = params.append(param, value);
        });

        return this.http.get<Activity[]>(this.endpoint, { params }).pipe(
            map(activities =>
                activities.map(a =>
                    this.parseActivity(a, <any>{
                        programId: paramValues.programId,
                        asignee: getFromLocalStorage(this.storageKey, a.id)
                    })
                )
            ),
            catchError((error: any) => throwError(error.json()))
        );
    }

    createActivity(activity: Activity): Observable<Activity> {
        return this.http.post<Activity>(this.endpoint, activity).pipe(
            map(a => {
                setFromLocalStorage(this.storageKey, {
                    [a.id]: activity.asignee
                });

                return a;
            }),
            catchError((error: any) => throwError(error.json()))
        );
    }

    updateActivity(activity: Activity): Observable<Activity> {
        return this.http
            .put<Activity>(`${this.endpoint}${activity.id}/`, activity)
            .pipe(
                map(a => {
                    setFromLocalStorage(this.storageKey, {
                        [a.id]: activity.asignee
                    });

                    return a;
                }),
                catchError((error: any) => throwError(error.json()))
            );
    }

    deleteActivity(activityId: number): Observable<any> {
        return this.http.delete<any>(`${this.endpoint}${activityId}/`).pipe(
            map(a => {
                removeFromLocalStorage(this.storageKey, activityId.toString());

                return a;
            }),
            catchError((error: any) => throwError(error.json()))
        );
    }

    private parseActivity(dto: Activity, ds: Activity): Activity {
        const {
            id,
            name,
            expected_end_date,
            expected_start_date,
            workflowlevel1
        } = dto;

        return {
            id,
            name,
            workflowlevel1,
            expected_start_date: moment(expected_start_date).format(
                DEFAULT_DATE_FORMAT
            ),
            expected_end_date: moment(expected_end_date).format(
                DEFAULT_DATE_FORMAT
            ),
            ...ds
        };
    }
}
