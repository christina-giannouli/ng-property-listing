import { Injectable } from '@angular/core';

@Injectable()
export class TokenService {
    constructor() {}

    /* get token from localStorage */
    getToken(tokenKey: string): string {
        const token: string = localStorage.getItem(tokenKey);
        return token ? token : null;
    }
}
