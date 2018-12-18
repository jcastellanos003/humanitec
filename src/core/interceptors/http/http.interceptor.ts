import { Injectable, Inject } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';

import { ApiConfigInjectionToken } from '@humanitec/shared/tokens';

import { ApiConfig } from '../../models';

import { Observable } from 'rxjs';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
    constructor(@Inject(ApiConfigInjectionToken) private config: ApiConfig) {}

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        const url = `${this.config.url}${request.url}`;
        const { token } = this.config.auth;

        request = request.clone({
            setHeaders: {
                Authorization: token
            },
            url
        });
        return next.handle(request);
    }
}
