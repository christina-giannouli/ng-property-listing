import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Unit } from '../interfaces/unit.interface';

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
}
