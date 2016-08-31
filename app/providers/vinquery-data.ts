import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events, LocalStorage, Storage } from 'ionic-angular';


@Injectable()
export class VinqueryData {
    data: any;
    apiUrl: string = 'https://api.vehiclehistory.com/vehicleSpecifications/';

    constructor(private http: Http) {

    }

    load(vin) {
        if (this.data) return Promise.resolve(this.data);

        return new Promise(resolve => {
            this.http.get(this.apiUrl + vin).subscribe(res => {
                this.data = res.json();
                resolve(this.data);
            });
        });
    }

    getVinquery(vin) {
        return this.load(vin).then(data => {
            return this.generateArray(data);
        });
    }

    generateArray(obj) {
        return Object.keys(obj).map((key) => {
            return obj[key];
        });
    }
}
