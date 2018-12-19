import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Activity } from '@humanitec/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

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
                    name: a.name,
                    startDate: a['expected_start_date'],
                    endDate: a['expected_end_date']
                }))
            ),
            catchError((error: any) => throwError(error.json()))
        );
    }
}
