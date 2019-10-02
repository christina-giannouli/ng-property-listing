/** third party modules */
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { LocalStorageService } from '../../services/localstorage.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtHelper: JwtHelperService,
        private localstorageService: LocalStorageService,
    ) {}

    /** it checks whether a user is authenticated or not */
    isUserAuthenticated(): boolean {
        const token: string = this.localstorageService.getValue('accessToken');

        if (token) {
            return !this.jwtHelper.isTokenExpired(token);
        }
        return false;
    }
}
