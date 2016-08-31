import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {AboutPage} from '../about/about';
import {HomePage} from '../home/home';

@Component({
    templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
    // set the root pages for each tab
    tab1Root:any = HomePage;
    tab3Root:any = AboutPage;

    mySelectedIndex:number;

    constructor(navParams:NavParams) {
        this.mySelectedIndex = navParams.data.tabIndex || 0;
    }
}
