/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { HttpClientModule } from '@angular/common/http';

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
import { TokenService } from './core/services/token.service';

/* Guards */
import { AuthGuard } from './core/auth/guards/auth.guard';

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
    providers: [AuthGuard, AuthService, TokenService, LoginService],
    bootstrap: [AppComponent],
})
export class AppModule {}
