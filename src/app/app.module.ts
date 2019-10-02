/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

/* Components */
import { AppComponent } from './app.component';
import { UnitsComponent } from './units/components/units/units.component';
import { UnitComponent } from './units/components/unit/unit.component';
import { LoginComponent } from './login/components/login/login.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';

/* Services */
import { JwtOptionsService } from './core/services/jwt-options.service';
import { LoginService } from './login/services/login.service';
import { AuthService } from './core/auth/services/auth.service';
import { LocalStorageService } from './core/services/localstorage.service';

/* Auth */
import { AuthGuard } from './core/auth/guards/auth.guard';
import { AuthInterceptor } from './core/auth/interceptors/auth.interceptor';

@NgModule({
    declarations: [AppComponent, LoginComponent, UnitsComponent, UnitComponent, LoginFormComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        HttpClientModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useClass: JwtOptionsService,
            },
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        AuthGuard,
        AuthService,
        LocalStorageService,
        LoginService,
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
