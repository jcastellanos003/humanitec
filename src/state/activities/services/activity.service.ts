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

    getActivitiesByProgramId(programId: number): Observable<Activity[]> {
        let params = new HttpParams();
        params = params.append('workflowlevel1__id', programId.toString());

        return this.http.get<Activity[]>(this.endpoint, { params }).pipe(
            map(activities =>
                activities.map(a => ({
                    id: a.id,
                    programId,
                    name: a.name,
                    startDate: moment(a['expected_start_date']).format(
                        DEFAULT_DATE_FORMAT
                    ),
                    endDate: moment(a['expected_end_date']).format(
                        DEFAULT_DATE_FORMAT
                    )
                }))
            ),
            catchError((error: any) => throwError(error.json()))
        );
    }
}
