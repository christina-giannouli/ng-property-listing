import { AuthService } from '../services/auth.service';
import { AuthGuard } from './auth.guard';
import { Router } from '@angular/router';
import { getTestBed, TestBed } from '@angular/core/testing';

describe('Guard: AuthGuard', () => {
    let authGuard: AuthGuard;
    let authService: jasmine.SpyObj<AuthService>;
    let router: jasmine.SpyObj<Router>;
    let injector: TestBed;
    
    beforeEach(() => {
        authService = jasmine.createSpyObj('AuthService', ['isUserAuthenticated']);
        router = jasmine.createSpyObj('Router', ['navigate']);
        
        // set up TestBed
        TestBed.configureTestingModule({
            providers: [
                AuthGuard,
                { provide: AuthService, useValue: authService },
                { provide: Router, useValue: router },
            ],
        });
        
        injector = getTestBed();
        authGuard = injector.get(AuthGuard);
    });
    
    // guard creation
    it(`should create the guard`, () => {
        expect(authGuard).toBeTruthy();
    });
    
    // canActivate when user is logged in
    it(`canActivate(): should return true when the user has been successfully logged in`, () => {
        authService.isUserAuthenticated.and.returnValue(true);
        
        // mock call to service's canActivate()
        const canActivateCall = authGuard.canActivate();
        
        // expectations
        expect(authService.isUserAuthenticated).toHaveBeenCalledTimes(1);
        expect(authService.isUserAuthenticated).toHaveBeenCalledWith();
        expect(canActivateCall).toEqual(true);
    });
    
    // canActivate when user failed to login
    it(`canActivate(): should redirect to /login and return false when the user failed to login`, () => {
        // mock call and return value to roleService.isUserAdministrator()
        authService.isUserAuthenticated.and.returnValue(false);
        
        // mock call to service's canActivate()
        const canActivateCall = authGuard.canActivate();
        
        // expectations
        expect(authService.isUserAuthenticated).toHaveBeenCalledTimes(1);
        expect(authService.isUserAuthenticated).toHaveBeenCalledWith();
        expect(router.navigate).toHaveBeenCalledTimes(1);
        expect(router.navigate).toHaveBeenCalledWith(['/login']);
        expect(canActivateCall).toEqual(false);
    });
});
