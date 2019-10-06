/* Testing */
import { TestBed, getTestBed } from '@angular/core/testing';

/* Services */
import { LocalStorageService } from './localstorage.service';

describe('Service: LocalStorageService', () => {
    let localStorageService: LocalStorageService;
    let injector: TestBed;

    // set up TestBed
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LocalStorageService],
        });

        injector = getTestBed();
        localStorageService = injector.get(LocalStorageService);
    });

    // service creation
    it(`should create the service`, () => {
        expect(localStorageService).toBeTruthy();
    });

    // getValue() when key value exists
    it(`getValue(): should return the value from localStorage when the key value exists`, () => {
        const key: string = 'accessToken';
        const value: string = 'token-12345';

        // mock call and return value to localStorage.getItem()
        spyOn(localStorage, 'getItem').and.returnValue(value);

        // mock call to service's getValue()
        const getValueCall = localStorageService.getValue(key);

        // expectations
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith(key);
        expect(getValueCall).toBe(value);
    });

    // getValue() when key value does not exist
    it(`getValue(): should return null when the key vALUE does not exist`, () => {
        const key: string = 'accessToken';

        // mock call and return value to localStorage.getItem()
        spyOn(localStorage, 'getItem').and.returnValue(null);

        // mock call to service's getValue()
        const getValueCall = localStorageService.getValue(key);

        // expectations
        expect(localStorage.getItem).toHaveBeenCalledTimes(1);
        expect(localStorage.getItem).toHaveBeenCalledWith(key);
        expect(getValueCall).toBe(null);
    });

    // setValue()
    it(`setValue(): should update localStorage with the new value`, () => {
        const key: string = 'accessToken';
        const value: string = 'token-12345';

        // mock call and return value to localStorage.setItem()
        spyOn(localStorage, 'setItem').and.returnValue(value);

        // mock call to service's setValue()
        const setValueCall = localStorageService.setValue(key, value);

        // expectations
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
        expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
        expect(setValueCall).toBeUndefined();
    });
});
