import { Component } from '@angular/core';
import { Storage, LocalStorage, AlertController, MenuController, NavController } from 'ionic-angular';
import { BarcodeScanner } from 'ionic-native';
import { SearchPage } from '../search/search';

@Component({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
    local: Storage = new Storage(LocalStorage);

    constructor(private nav: NavController, public alertCtrl: AlertController, private menu: MenuController) {
      console.log('KNDJT2A53C7429257');
    }

    ionViewDidEnter() {
        let range = document.getElementById('range');
        
    }
}
