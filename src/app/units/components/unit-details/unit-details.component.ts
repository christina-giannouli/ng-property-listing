import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UnitDetails } from '../../interfaces/unit-details.interface';
import { BookedUnit } from '../../interfaces/booked-unit.interface';

@Component({
    selector: 'app-unit-details',
    templateUrl: './unit-details.component.html',
    styleUrls: ['./unit-details.component.scss'],
})
export class UnitDetailsComponent {
    @Input() unitDetails: UnitDetails;
    @Output() bookedUnit: EventEmitter<BookedUnit> = new EventEmitter<BookedUnit>();
    @Output() drawerClosed: EventEmitter<boolean> = new EventEmitter<boolean>();
    // gets updated on ngModel change
    selectedYear: string = null;

    constructor() {}

    /* creates bookedUnit object and emits it to the parent component */
    onBook(id: string, year: string): void {
        const selectedUnit: BookedUnit = {
            unitId: id,
            year: parseInt(year),
        };
        this.bookedUnit.emit(selectedUnit);
    }

    /* emits true to the parent component */
    onDrawerClose(event: MouseEvent): void {
        if (event.type === 'click') {
            this.drawerClosed.emit(true);
        }
    }
}
