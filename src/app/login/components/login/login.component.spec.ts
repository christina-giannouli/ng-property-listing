import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from '../login-form/login-form.component';
import { LoginUser } from '../../interfaces/login-user.interface';
import { AuthToken } from '../../../core/interfaces/auth-token.interface';
import { User } from '../../../core/interfaces/user.interface';
import { Authentication } from '../../../core/interfaces/authentication.interface';
import { of } from 'rxjs/internal/observable/of';

describe('LoginComponent', () => {
    let component: LoginComponent;
    let fixture: ComponentFixture<LoginComponent>;
    let loginService: jasmine.SpyObj<LoginService>;
    let router: jasmine.SpyObj<Router>;
    let localStorageService: jasmine.SpyObj<LocalStorageService>;

    beforeEach(async(() => {
        loginService = jasmine.createSpyObj('LoginService', ['login']);
        localStorageService = jasmine.createSpyObj('LocalStorageService', ['setValue']);
        router = jasmine.createSpyObj('Router', ['navigate']);

        TestBed.configureTestingModule({
            imports: [ReactiveFormsModule],
            declarations: [LoginComponent, LoginFormComponent],
            providers: [
                { provide: Router, useValue: router },
                { provide: LoginService, useValue: loginService },
                { provide: LocalStorageService, useValue: localStorageService },
            ],
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(LoginComponent);
                component = fixture.componentInstance;
            });
    }));

    afterEach(() => {
        fixture.destroy();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    // component creation
    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    // ngOnInit()
    it(`ngOnInit(): should call the initLoginForm() once and component variables should have their default values`, async(() => {
        // default component's variable values
        expect(component.isAlertDisplayed).toBeFalsy();
        expect(component.unauthorizedMessage).toEqual(null);
        expect(component.validationMessages).toEqual([]);
        expect(component.emailValidationPattern).toEqual(
            `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))`,
        );

        // mock calls to other initLoginForm()
        spyOn(component, 'initLoginForm');
        // mock call to component's ngOnInit()
        const ngOnInitCall = component.ngOnInit();

        // expectations
        expect(component.initLoginForm).toHaveBeenCalledTimes(1);
        expect(ngOnInitCall).toBeUndefined();
    }));

    // onLogin() on subscribe success
    it(`onLogin(): should call the localStorageService 3 times to set the accessToken the refreshToken and the user, and redirect to '/units' page, on subscribe success`, async(() => {
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

        const stringifiedUser: string = JSON.stringify(user);

        const authentication: Authentication = {
            token,
            user,
        };

        // mock call and return value to LoginService.login()
        loginService.login.and.returnValue(of(authentication));

        // mock call to component's onLogin()
        const onLoginCall = component.onLogin(loginUser);

        // expectations
        expect(loginService.login).toHaveBeenCalledTimes(1);
        expect(loginService.login).toHaveBeenCalledWith(loginUser);
        expect(localStorageService.setValue).toHaveBeenCalledTimes(3);
        expect(localStorageService.setValue).toHaveBeenCalledWith('accessToken', token.accessToken);
        expect(localStorageService.setValue).toHaveBeenCalledWith(
            'refreshToken',
            token.refreshToken,
        );
        expect(localStorageService.setValue).toHaveBeenCalledWith('user', stringifiedUser);
        expect(localStorageService.setValue).toHaveBeenCalledBefore(router.navigate);
        expect(router.navigate).toHaveBeenCalledWith(['/units']);
        expect(onLoginCall).toBeUndefined();
    }));
});
