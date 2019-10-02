import { Component, OnInit } from '@angular/core';
import { UnitsService } from '../../services/units.service';
import { Unit } from '../../interfaces/unit.interface';
import { UnitData } from '../../interfaces/unit-data.interface';

@Component({
    selector: 'app-units',
    templateUrl: './units.component.html',
    styleUrls: ['./units.component.scss'],
})
export class UnitsComponent implements OnInit {
    units: UnitData[];
    totalCount: number;

    constructor(private unitsService: UnitsService) {}

    ngOnInit() {
        this.getUnits();
    }

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
}
