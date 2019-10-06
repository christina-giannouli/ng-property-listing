import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { Unit } from '../../interfaces/unit.interface';
import { UnitData } from '../../interfaces/unit-data.interface';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { User } from '../../../core/interfaces/user.interface';
import { UnitDetails } from '../../interfaces/unit-details.interface';
import { BookedUnit } from '../../interfaces/booked-unit.interface';

@Component({
    selector: 'app-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss'],
})
export class UnitsComponent implements OnInit {
    units: UnitData[] = [];
    unitDetails: UnitDetails;
    bookedUnit: BookedUnit;

    pageNumber: number = 1;
    itemsPerPage: number = 10;

    user: User;

    isUnitDetailsDrawerOpen: boolean = false;
    // prevents console errors caused by initially undefined unitDetails object properties
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
        this.unitsService.getUnitList(this.pageNumber, this.itemsPerPage).subscribe(
            (unit: Unit) => {
                this.units = this.units.concat(unit.data);
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

            // trims 'br' tags and updates description value
            this.unitDetails = {
                ...this.unitDetails,
                description: this.unitDetails.description.replace(/<[^>]*>/g, ''),
            };

            // once unitDetails is no longer undefined
            // it turns to true to display the data on UI
            this.isUnitDetailsContentLoaded = true;
        });
    }

    /* gets the user stored on localStorage and parses it to a User object */
    getUser(): void {
        const storedUser: string = this.localStorageService.getValue('user');
        this.user = JSON.parse(storedUser);
    }

    openUnitDetails(id: string): void {
        this.isUnitDetailsDrawerOpen = true;
        this.getUnitDetails(id);
    }

    /* gets the specified unit form child event to call the service,
     * updates bookedUnit, and isUnitDetailsDrawerOpen */
    onUnitBooked(unit: BookedUnit): void {
        this.unitsService.bookUnit(unit).subscribe(
            (booking: BookedUnit) => {
                this.bookedUnit = booking;
                this.isUnitDetailsDrawerOpen = false;
            },
            (bookingError: any) => console.error(bookingError),
        );
    }

    /* grabs the event emitted from the child component
     * and updates the isUnitDetailsDrawerOpen  */
    onUnitDetailsDrawerClosed(event: boolean): void {
        event ? (this.isUnitDetailsDrawerOpen = false) : true;
    }

    /*  each time list reaches the end of the window it increases the pageNumber by one
     * and fetches the next group in units list */
    onScroll(): void {
        this.pageNumber = this.pageNumber ? ++this.pageNumber : 1;
        this.getUnits();
    }
}
