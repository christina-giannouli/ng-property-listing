import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { LoginService } from '../../services/login.service';
import { LoginUser } from '../../interfaces/login-user.interface';
import { Authentication } from '../../../core/interfaces/authentication.interface';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    // form
    loginForm: FormGroup;
    // errors
    errorMessages: string[];
    // Form controls validation patterns
    emailValidationPattern: string = `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))`;

    constructor(
        private localStorageService: LocalStorageService,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
    }

    /* initialize form values and set up validations */
    initLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(this.emailValidationPattern)]],
            password: [null, [Validators.required]],
        });
    }

    /* gets the user from the child event payload and stores the auth token,
     * the refresh token and the user to localStorage */
    onLogin(user: LoginUser): void {
        this.loginService.login(user).subscribe(
            (auth: Authentication) => {
                // on success
                this.localStorageService.setValue('accessToken', auth.token.accessToken);
                this.localStorageService.setValue('refreshToken', auth.token.refreshToken);
                this.localStorageService.setValue('user', JSON.stringify(auth.user));
                // redirect to protected route
                this.router.navigate(['/units']);
            },
            (loginError: any) => {
                this.errorMessages = loginError.error.errors.map((error) => error.messages);
            },
        );
    }
}
