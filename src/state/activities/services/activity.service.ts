import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Activity } from '@humanitec/core';
import { DEFAULT_DATE_FORMAT } from '@humanitec/utils';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import * as moment from 'moment';

@Injectable()
export class ActivityService {
    constructor(private http: HttpClient, private endpoint: string) {}

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
                activities.map(a => ({
                    id: a.id,
                    programId: paramValues.programId,
                    name: a.name,
                    expected_start_date: moment(a.expected_start_date).format(
                        DEFAULT_DATE_FORMAT
                    ),
                    expected_end_date: moment(a.expected_end_date).format(
                        DEFAULT_DATE_FORMAT
                    ),
                    workflowlevel1: a.workflowlevel1
                }))
            ),
            catchError((error: any) => throwError(error.json()))
        );
    }

    createActivity(activity: Activity): Observable<Activity> {
        return this.http
            .post<Activity>(this.endpoint, activity)
            .pipe(catchError((error: any) => throwError(error.json())));
    }

    updateActivity(activity: Activity): Observable<Activity> {
        return this.http
            .put<Activity>(`${this.endpoint}${activity.id}/`, activity)
            .pipe(catchError((error: any) => throwError(error.json())));
    }

    deleteActivity(activityId: number): Observable<any> {
        return this.http
            .delete<any>(`${this.endpoint}${activityId}/`)
            .pipe(catchError((error: any) => throwError(error.json())));
    }
}
