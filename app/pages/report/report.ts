import {Component, ViewChild} from '@angular/core';
import {Storage, LocalStorage, Alert, App, ItemSliding, List, Modal, NavController, Page} from 'ionic-angular';
import {DetailsPage} from '../report/details/details';


@Component({
	templateUrl: 'build/pages/report/report.html'
})
export class ReportPage {
	@ViewChild('reportList', {read: List}) reportList: List;

	local: Storage         = new Storage(LocalStorage);
	vinqueryData: any;
	imagesData: any;
	safetyData: any;
	recallsData: any;
	reviewsData: any;
	equipmentData: any;
	loadedData: Array<any> = [];
	date: string;
	vin: string;
	vehicleAge: string;
	recordsCount: number;

	constructor(private app: App, private nav: NavController) {
		// add safety, recalls, reviews, equipment, tco
	}

	ionViewDidEnter() {
		this.app.setTitle('Report');

		// Initialize empty list
		this.recordsCount = 0;
		this.loadedData   = [];

		this.local.get('images').then(imagesData => {
			this.imagesData = JSON.parse(imagesData);

			let imagesCount = this.imagesData.length;
			this.recordsCount = this.recordsCount + imagesCount;

			this.loadedData.push({key: 'images', name: 'Images', data: this.imagesData, count: imagesCount});
		});


		this.local.get('vin').then(vin => {
			this.vin = vin;
			console.log(this.vin);
		});
	}

	itemSelected(report) {
		console.log(report);
		if (report === 'details') this.nav.push(DetailsPage);
	}
}
