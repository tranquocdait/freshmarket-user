import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CheckValidatorService {

    constructor() { }

    public isNumber(n: any): boolean {
        return !isNaN(parseFloat(n)) && !isNaN(n - 0);
    }
}
