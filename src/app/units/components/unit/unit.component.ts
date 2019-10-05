import { Component, Input, OnInit } from '@angular/core';
import { UnitData } from '../../interfaces/unit-data.interface';
import { BookedUnit } from '../../interfaces/booked-unit.interface';

@Component({
    selector: 'app-unit',
    templateUrl: './unit.component.html',
    styleUrls: ['./unit.component.scss'],
})
export class UnitComponent implements OnInit {
    @Input() unit: UnitData;
    @Input() bookedUnit: BookedUnit;

    starsRating: boolean[] = [];

    constructor() {}

    ngOnInit(): void {
        this.fillRatingStars();
    }

    /* returns the image from the array with the specified size */
    getPictureBySize(size: string): string {
        return this.unit.pictures.find((img: string) => img.includes(size));
    }

    fillRatingStars(): void {
        for (let i = 0; i < 5; i++) {
            this.starsRating.push(i < this.unit.rating);
        }
    }
}
