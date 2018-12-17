import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    constructor(private http: HttpClient) {}

    ngOnInit() {
        const customHeaders = new HttpHeaders().append(
            'Authorization',
            'Bearer GfR6vIHG0zTWaJle6TjNXvYUrjDn6g'
        );
        /* headers = headers.append('Content-Type', 'application/json'); */
        /* headers = headers.append('Access-Control-Allow-Origin', '*');
        headers = headers.append('Access-Control-Allow-Credentials', 'true'); */
        this.http
            .get<any>('https://dev-api.toladata.io/api/workflowlevel1/', {
                headers: customHeaders
            })
            .subscribe(
                (data: any) => {
                    console.log('data...', data);
                },
                err => console.log('errr=====', err)
            );
    }
}
