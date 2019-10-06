import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Unit } from '../interfaces/unit.interface';
import { UnitDetails } from '../interfaces/unit-details.interface';
import { BookedUnit } from '../interfaces/booked-unit.interface';

@Injectable({
    providedIn: 'root',
})
export class UnitsService {
    constructor(private http: HttpClient) {}

    getUnitList(pageNumber: number = 1, itemsPerPage: number = 10): Observable<Unit> {
        const params = {
            page: pageNumber.toString(),
            perPage: itemsPerPage.toString(),
        };
        return this.http.get<any>(`${environment.serverUrl}/units`, { params }).pipe(
            map((response: Unit) => {
                return response;
            }),
        );
    }

    getUnitDetails(id: string): Observable<UnitDetails> {
        return this.http.get<any>(`${environment.serverUrl}/units/${id}`).pipe(
            map((response: UnitDetails) => {
                return response;
            }),
        );
    }

    bookUnit(unit: BookedUnit): Observable<BookedUnit> {
        return this.http.post<any>(`${environment.serverUrl}/units/book`, unit).pipe(
            map((response: BookedUnit) => {
                return response;
            }),
        );
    }
}
