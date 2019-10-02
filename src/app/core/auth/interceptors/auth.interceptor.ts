/** third-party modules */
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalStorageService } from '../../services/localstorage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private localStorageService: LocalStorageService) {}

    /** set authentication headers to http request */
    intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let request: HttpRequest<any>;

        // headers for all http requests
        request = httpRequest.clone({
            setHeaders: {
                Authorization: `Bearer ${this.localStorageService.getValue('accessToken')}`,
                'Content-Type': 'application/json; charset=utf-8',
                Accept: 'application/json',
            },
        });

        return next.handle(request);
    }
}
