import { getTestBed, TestBed } from '@angular/core/testing';
import { LoginService } from './login.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { LoginUser } from '../interfaces/login-user.interface';
import { Authentication } from '../../core/interfaces/authentication.interface';
import { AuthToken } from '../../core/interfaces/auth-token.interface';
import { User } from '../../core/interfaces/user.interface';
import { environment } from '../../../environments/environment';

describe('LoginService', () => {
    let loginService: LoginService;
    let httpMock: HttpTestingController;
    let injector: TestBed;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginService],
            imports: [HttpClientTestingModule],
        });

        injector = getTestBed();
        httpMock = injector.get(HttpTestingController);
        loginService = injector.get(LoginService);
    });

    afterEach(() => {
        httpMock.verify();
    });

    // service creation
    it('should be created', () => {
        const service: LoginService = TestBed.get(LoginService);
        expect(service).toBeTruthy();
    });

    // login()
    it(`login() should make a 'POST' request, with the user as request body and return the token value along with the user`, () => {
        const loginUser: LoginUser = {
            email: 'ben@2041.uk',
            password: 'idietoosoon',
        };

        const token: AuthToken = {
            accessToken: '12345',
            refreshToken: 'refresh-12345',
        };

        const user: User = {
            email: 'ben@2041.uk',
            id: '1',
            name: 'Ben Sawyer',
        };

        const authentication: Authentication = {
            token,
            user,
        };

        // as the HTTP request methods return an Observable,
        // we subscribe to it and create our expectations in the callback methods
        loginService.login(loginUser).subscribe((auth: Authentication) => {
            expect(auth).toEqual(authentication);
        });

        // mock request and check if the API called once
        const req = httpMock.expectOne(`${environment.serverUrl}/auth/login`, 'call to api');
        expect(req.request.method).toBe('POST');
        expect(req.request.body).toEqual(loginUser);

        // provide dummy values as response
        req.flush(authentication);
    });
});
