import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Events, LocalStorage, Storage } from 'ionic-angular';

@Injectable()
export class EdmundsData {
    data: any;
    apiUrl: string = 'https://api.massinflux.com/edmunds/';

    constructor(private http: Http) {
    }

    load(method, value) {
        //if (this.data) return Promise.resolve(this.data);

        return new Promise(resolve => {
            this.http.get(this.apiUrl + method + '/' + value).subscribe(res => {
                this.data = res.json();
                resolve(this.data);
            });
        });
    }

    loadYMM(method, year, make, model) {
        return new Promise(resolve => {
            this.http.get(this.apiUrl + method + '/' + year + '/' + make + '/' + model).subscribe(res => {
                this.data = res.json();
                resolve(this.data);
            });
        });
    }

    getByYMM(method, year, make, model) {
        return this.loadYMM(method, year, make, model).then(data => {
            return this.generateArray(data);
        });
    }

    getByStyleId(method, styleId) {
        return this.load(method, styleId).then(data => {
            return this.generateArray(data);
        });
    }

    generateArray(obj) {
        return Object.keys(obj).map((key) => {
            return obj[key];
        });
    }
}
