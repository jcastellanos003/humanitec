import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Program } from '@humanitec/core';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class ProgramsService {
    constructor(private http: HttpClient, private endpoint: string) {}

    getPrograms(): Observable<Program[]> {
        return this.http.get<Program[]>(this.endpoint).pipe(
            map(programs =>
                programs.map(p => ({
                    id: p.id,
                    name: p.name,
                    budget: p.budget,
                    create_date: p.create_date,
                    status: p.status,
                    url: p.url
                }))
            ),
            catchError((error: any) => throwError(error.json()))
        );
    }
}
