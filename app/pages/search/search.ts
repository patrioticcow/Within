import {Component} from '@angular/core';
import {Observable} from "rxjs/Rx";
import {Storage, LocalStorage, NavController} from 'ionic-angular';
import {VinqueryData} from '../../providers/vinquery-data';
import {EdmundsData} from '../../providers/edmunds-data';
import {ReportPage} from '../report/report';
import {HomePage} from '../home/home';

@Component({
    templateUrl: 'build/pages/search/search.html',
    providers: [VinqueryData, EdmundsData]
})
export class SearchPage {
    local: Storage = new Storage(LocalStorage);
    vin: string;
    styleId: string;
    modelYearId: string;
    timer: any;
    messages: Array<string> = [];
    loadedData: Array<string> = [];
    matchArray: Array<string> = ['images', 'safety', 'equipment', 'recalls', 'reviews'];
    dataKeyArray: Array<any> = [
        {key: 'images', value: 'Images', param: 'style_id'},
        {key: 'safety', value: 'Safety', param: 'style_id'},
        {key: 'equipment', value: 'Equipment', param: 'style_id'},
        {key: 'recalls', value: 'Recalls', param: 'model_year_id'},
        {key: 'reviews', value: 'Reviews', param: 'style_id'}
    ];

    constructor(private nav: NavController, private vinqueryData: VinqueryData, private edmundsData: EdmundsData) {

    }

    ngOnInit() {
        this.local.remove('isLoaded');

        let observe = Observable.timer(2000, 3000);
        this.timer = observe.subscribe(t => {
            this.local.get('isLoaded').then(isLoaded => {
                if(isLoaded !== 'yes') this.checkDataIsLoaded(t);
            });
        });
    }

    ionViewLoaded() {
        console.log('ionViewLoaded');
    }

    onPageWillEnter() {
        console.log('onPageWillEnter');
    }

    ionViewDidEnter() {
        console.log('ionViewDidEnter');
        Observable.forkJoin([this.getVinParam()]).subscribe(data => {
            this.vin = data[0] === 'xxx' ? 'KNDJT2A53C7429257' : data[0];

            this.getVinqueryData();
        });
    }

    getReportData() {
        let that = this;

        for (let i = 0; i < this.dataKeyArray.length; i++) {
            let dataKey = this.dataKeyArray[i];
            this.getVehicleData(dataKey).then(function (data: any) {
                console.log(dataKey.key);
                console.log(data);

                let value = data.type !== undefined ? null : JSON.stringify(data);
                that.local.set(dataKey.key, value).then(resp => {
                    that.loadedData.push(dataKey.key);
                });

                // debug
                if (data.type !== undefined) {
                    console.warn(dataKey.key);
                    console.warn(data);
                }
            });
        }
    }

    checkDataIsLoaded(t) {
        console.log(this.loadedData);
        if (this.matchArray.sort().join(',') === this.loadedData.sort().join(',')) {
            this.local.set('isLoaded', 'yes');

            this.nav.push(ReportPage);
        }
    }

    ionViewWillLeave() {
        this.timer.unsubscribe();
    }

    getVinqueryData() {
        console.log('getVinqueryData');
        let that = this;
        // TODO to save or not o save based on vin? maybe it will take too much space on localstorge
        this.vinqueryData.load(this.vin).then(resp => {
            if(resp.type !== undefined) {
                // some error, go to home page
                this.local.set('isLoaded', 'yes');
                this.nav.push(HomePage);
            } else {
                that.local.set('vinqueryData', JSON.stringify(resp));

                let attr = resp.attributes;

                that.getStyleId(attr.model_year, attr.make, attr.model);
            }
        });
    }

    getStyleId(year, make, model) {
        this.messages.push('Getting Vehicle Info');
        let that = this;

        return this.edmundsData.loadYMM('getStyleId', year, make, model).then(function (style: any) {
            console.log(style);
            that.local.set('styleId', style.style_id);
            that.local.set('modelYearId', style.model_year_id);

            that.styleId = style.style_id;
            that.modelYearId = style.model_year_id;

            that.getReportData();

            return style;
        });
    }

    getVehicleData(data) {
        this.messages.push('Getting Vehicle ' + data.value);

        let param = '';
        if (data.param === 'style_id') param = this.styleId;
        if (data.param === 'model_year_id') param = this.modelYearId;

        return this.edmundsData.load(data.key, param).then(resp => {
            return resp;
        })
    }

    getVinParam() {
        return this.local.get('vin').then(vin => {
            this.vin = vin;
            return vin;
        })
    }
}
