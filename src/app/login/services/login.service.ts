import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Jwt } from '../../core/interfaces/jwt.interface';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class LoginService {
    constructor(private http: HttpClient) {}

    /** it posts the login user to the server and returns a jwt accessToken */
    login(user: any): Observable<Jwt> {
        return this.http.post<any>(`${environment.serverUrl}/auth/login`, user).pipe(
            map((response: any) => response.data),
            map((jwtEnvelope: any) => {
                console.log('jwt:', jwtEnvelope);

                return jwtEnvelope;
            }),
        );
    }
}
