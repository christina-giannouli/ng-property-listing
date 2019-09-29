import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UnitsComponent } from "./units/components/units/units.component";
import { UnitComponent } from "./units/components/unit/unit.component";
import { LoginComponent } from "./login/components/login/login.component";

@NgModule({
    declarations: [AppComponent, LoginComponent, UnitsComponent, UnitComponent],
    imports: [BrowserModule, AppRoutingModule],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
