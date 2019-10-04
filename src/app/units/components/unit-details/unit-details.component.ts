import { Component, Input } from '@angular/core';
import { UnitDetails } from '../../interfaces/unit-details.interface';

@Component({
    selector: 'app-unit-details',
    templateUrl: './unit-details.component.html',
    styleUrls: ['./unit-details.component.scss'],
})
export class UnitDetailsComponent {
    @Input() unitDetails: UnitDetails;

    constructor() {}
}
