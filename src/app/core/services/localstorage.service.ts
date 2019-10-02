import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
    constructor() {}

    /* get key from localStorage */
    getValue(key: string): string {
        const value: string = localStorage.getItem(key);
        return value ? value : null;
    }
    
    /* set value to localStorage */
    setValue(key: string, value: string): void {
        localStorage.setItem(key, value);
    }
}
