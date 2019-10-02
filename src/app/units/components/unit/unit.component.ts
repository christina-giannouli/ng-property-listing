import { Component, Input } from '@angular/core';
import { UnitData } from '../../interfaces/unit-data.interface';

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.scss'],
})
export class UnitComponent {
    @Input() unit: UnitData;

    constructor() {}

    /* returns the image from the array with the specified size */
    getPictureBySize(size: string): string {
        return this.unit.pictures.find((img: string) => img.includes(size));
    }
}
