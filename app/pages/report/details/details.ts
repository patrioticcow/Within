import {Component} from '@angular/core';
import {Storage, LocalStorage, App, NavController} from 'ionic-angular';

@Component({
	templateUrl: 'build/pages/report/details/details.html'
})
export class DetailsPage {
	local: Storage = new Storage(LocalStorage);
	searchQuery    = '';
	mainItems: Array<any>;
	items: Array<any>;

	constructor(private app: App, private nav: NavController) {

	}

	ionViewDidEnter() {
		this.loadItems();
	}

	loadItems() {
		this.local.get('vinqueryData').then(resp => {
			let vinQuery = JSON.parse(resp);

			this.mainItems = vinQuery.item;
			this.mainItems = this.mainItems.filter(function (item) {
		        return (item.value.toLowerCase() !== 'n/a');
		    });

			this.items = this.mainItems;
		});
	}

	initializeItems() {
		this.items = this.mainItems;
	}

	getItems(ev: any) {
		// Reset items back to all of the items
		this.initializeItems();

		// set val to the value of the searchBar
		var val = ev.srcElement.value;

		// if the value is an empty string don't filter the items
		if (val && val.trim() != '') {
			this.items = this.items.filter((item) => {
				return item.name.toLowerCase().indexOf(val.toLowerCase()) > -1;
			});
		}

		console.log(this.items);
	}
}
