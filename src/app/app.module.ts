/* Modules */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

/* Components */
import { AppComponent } from './app.component';
import { UnitsComponent } from './units/components/units/units.component';
import { UnitComponent } from './units/components/unit/unit.component';
import { LoginComponent } from './login/components/login/login.component';
import { LoginFormComponent } from './login/components/login-form/login-form.component';

/* Services */
import { JwtOptionsService } from './core/services/jwt-options.service';

/* Guards */

@NgModule({
    declarations: [AppComponent, LoginComponent, UnitsComponent, UnitComponent, LoginFormComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        JwtModule.forRoot({
            jwtOptionsProvider: {
                provide: JWT_OPTIONS,
                useClass: JwtOptionsService,
            },
        }),
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
