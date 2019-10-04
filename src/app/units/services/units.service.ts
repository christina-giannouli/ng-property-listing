import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Unit } from '../interfaces/unit.interface';
import { UnitDetails } from '../interfaces/unit-details.interface';

@Injectable({
    providedIn: 'root',
})
export class UnitsService {
    constructor(private http: HttpClient) {}

    getUnitList(): Observable<Unit> {
        return this.http.get<any>(`${environment.serverUrl}/units`).pipe(
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
}
