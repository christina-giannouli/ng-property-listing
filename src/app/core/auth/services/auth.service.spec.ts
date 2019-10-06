import { AuthService } from './auth.service';
import { LocalStorageService } from '../../services/localstorage.service';
import { getTestBed, TestBed } from '@angular/core/testing';
import { JwtHelperService } from '@auth0/angular-jwt';

describe('Service: AuthService', () => {
    let authService: AuthService;
    let localStorageService: jasmine.SpyObj<LocalStorageService>;
    let jwtHelper: jasmine.SpyObj<JwtHelperService>;
    let injector: TestBed;
    
    // set up TestBed
    beforeEach(() => {
        localStorageService = jasmine.createSpyObj('TokenService', ['getValue']);
        jwtHelper = jasmine.createSpyObj('JwtOptionsService', ['isTokenExpired']);
        
        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: LocalStorageService, useValue: localStorageService },
                { provide: JwtHelperService, useValue: jwtHelper },
            ],
        });
        
        injector = getTestBed();
        authService = injector.get(AuthService);
    });
    
    // service creation
    it(`should create the service`, () => {
        expect(authService).toBeTruthy();
    });
    
    // isUserAuthenticated() when when the token does not exist
    it(`isUserAuthenticated(): should return false when the token does not exist`, () => {
        const tokenKey: string = 'accessToken';
        
        // mock call and return value to localStorageService.getValue()
        localStorageService.getValue.and.returnValue(null);
        
        // mock call to service's isUserAuthenticated()
        const isUserAuthenticatedCall = authService.isUserAuthenticated();
        
        // expectations
        expect(localStorageService.getValue).toHaveBeenCalledTimes(1);
        expect(localStorageService.getValue).toHaveBeenCalledWith(tokenKey);
        expect(isUserAuthenticatedCall).toEqual(false);
    });
    
    // isUserAuthenticated() when when the token exists and is not expired
    it(`isUserAuthenticated(): should return false when the token exists and is not expired`, () => {
        const tokenKey: string = 'accessToken';
        
        // mock call and return value to localStorageService.getValue()
        localStorageService.getValue.and.returnValue(tokenKey);
        // mock call and return value to jwtHelper.isTokenExpired()
        jwtHelper.isTokenExpired.and.returnValue(false);
        
        // mock call to service's isUserAuthenticated()
        const isUserAuthenticatedCall = authService.isUserAuthenticated();
        
        // expectations
        expect(localStorageService.getValue).toHaveBeenCalledTimes(1);
        expect(localStorageService.getValue).toHaveBeenCalledWith(tokenKey);
        expect(jwtHelper.isTokenExpired).toHaveBeenCalledTimes(1);
        expect(jwtHelper.isTokenExpired).toHaveBeenCalledWith(tokenKey);
        expect(isUserAuthenticatedCall).toEqual(true);
    });
    
    // isUserAuthenticated() when when the token exists but has expired
    it(`isUserAuthenticated(): should return false when the token exists but has expired`, () => {
        const tokenKey: string = 'accessToken';
        
        // mock call and return value to localStorageService.getValue()
        localStorageService.getValue.and.returnValue(tokenKey);
        // mock call and return value to jwtHelper.isTokenExpired()
        jwtHelper.isTokenExpired.and.returnValue(true);
        
        // mock call to service's isUserAuthenticated()
        const isUserAuthenticatedCall = authService.isUserAuthenticated();
        
        // expectations
        expect(localStorageService.getValue).toHaveBeenCalledTimes(1);
        expect(localStorageService.getValue).toHaveBeenCalledWith(tokenKey);
        expect(jwtHelper.isTokenExpired).toHaveBeenCalledTimes(1);
        expect(jwtHelper.isTokenExpired).toHaveBeenCalledWith(tokenKey);
        expect(isUserAuthenticatedCall).toEqual(false);
    });
});
