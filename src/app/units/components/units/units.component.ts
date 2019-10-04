import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { Unit } from '../../interfaces/unit.interface';
import { UnitData } from '../../interfaces/unit-data.interface';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { User } from '../../../core/interfaces/user.interface';
import { UnitDetails } from '../../interfaces/unit-details.interface';

@Component({
    selector: 'app-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss'],
})
export class UnitsComponent implements OnInit {
    units: UnitData[];
    unitDetails: UnitDetails;

    totalCount: number;

    user: User;

    areUnitDetailsOpen: boolean = false;
    // prevents console errors due to undefined unitDetails object properties
    isUnitDetailsContentLoaded: boolean = false;

    constructor(
        private unitsService: UnitsService,
        private localStorageService: LocalStorageService,
    ) {}

    ngOnInit() {
        this.getUnits();
        this.getUser();
    }

    /* get the list of units from the server */
    getUnits(): void {
        this.unitsService.getUnitList().subscribe(
            (unit: Unit) => {
                this.units = unit.data;
                this.totalCount = unit.meta.totalCount;
            },
            (error: any) => {
                console.error(error);
            },
        );
    }

    /* gets details for the unit with the specified ID */
    getUnitDetails(unitId: string): void {
        this.unitsService.getUnitDetails(unitId).subscribe((unitDetails: UnitDetails) => {
            this.unitDetails = unitDetails;
            // this.unitDetails.description = this.unitDetails.description.replace(/<[^>]*>/g, '');

            // once unitDetails is no longer undefined
            // it turns to true to display the data n UI
            this.isUnitDetailsContentLoaded = true;
        });
    }

    /* gets the user stored on localStorage and parses it to a User object */
    getUser(): void {
        const storedUser: string = this.localStorageService.getValue('user');
        this.user = JSON.parse(storedUser);
    }

    openUnitDetails(id: string): void {
        this.areUnitDetailsOpen = true;
        this.getUnitDetails(id);
    }
}
