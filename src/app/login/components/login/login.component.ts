import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TokenService } from '../../../core/services/token.service';
import { Jwt } from '../../../core/interfaces/jwt.interface';
import { LoginService } from '../../services/login.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
    // form
    loginForm: FormGroup;

    // Form controls validation patterns
    emailValidationPattern: string = `^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))`;

    constructor(
        private tokenService: TokenService,
        private formBuilder: FormBuilder,
        private loginService: LoginService,
        private router: Router,
    ) {}

    ngOnInit(): void {
        this.initLoginForm();
    }

    // initialize form values and set up validations
    initLoginForm(): void {
        this.loginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.pattern(this.emailValidationPattern)]],
            password: [null, [Validators.required]],
        });
    }

    // gets the user from the child event payload and sets the jwt token
    onLogin(user: any): void {
        this.loginService.login(user).subscribe(
            (jwt: Jwt) => {
                // on success
                this.tokenService.setToken('token', jwt.accessToken);
                this.router.navigate(['/units']);
            },
            (loginError: any) => {},
        );
    }
}
