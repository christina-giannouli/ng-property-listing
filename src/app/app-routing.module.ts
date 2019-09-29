import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { UnitsComponent } from "./units/components/units/units.component";
import { UnitComponent } from "./units/components/unit/unit.component";

const routes: Routes = [
    { path: "units", component: UnitsComponent },
    { path: "unit/:id", component: UnitComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
