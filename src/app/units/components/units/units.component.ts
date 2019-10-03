import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { Unit } from '../../interfaces/unit.interface';
import { UnitData } from '../../interfaces/unit-data.interface';
import { LocalStorageService } from '../../../core/services/localstorage.service';
import { User } from '../../../core/interfaces/user.interface';

@Component({
    selector: 'app-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss'],
})
export class UnitsComponent implements OnInit {
    units: UnitData[];
    totalCount: number;
    user: User;

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

    /* gets the user stored on localStorage and parses it to a User object */
    getUser(): void {
        const storedUser: string = this.localStorageService.getValue('user');
        this.user = JSON.parse(storedUser);
    }
}
