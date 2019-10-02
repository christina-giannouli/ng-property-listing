import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { LoginUser } from '../interfaces/login-user.interface';
import { Authentication } from '../../core/interfaces/authentication.interface';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}

    /** it posts the login user to the server and returns a jwt accessToken along with the user */
    login(user: LoginUser): Observable<Authentication> {
        return this.http.post<any>(`${environment.serverUrl}/auth/login`, user).pipe(
            map((authentication: Authentication) => {
                return authentication;
            }),
        );
    }
}
