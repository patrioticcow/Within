import { Component } from '@angular/core';
import { MenuController, NavController } from 'ionic-angular';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
//import { TabsPage } from '../tabs/tabs';

interface Slide {
    title: string;
    description: string;
    image: string;
}

@Component({
    templateUrl: 'build/pages/tutorial/tutorial.html'
})
export class TutorialPage {
    slides: Slide[];
    showSkip = true;

    constructor(private nav: NavController, private menu: MenuController) {

    }

    startApp() {
        this.nav.setRoot(HomePage);
    }

    onSlideChangeStart(slider) {
        this.showSkip = !slider.isEnd;
    }

    ionViewDidEnter() {
        this.slides = [
            {
                title: 'Welcome to <b>Within</b>',
                description: '<b>Within.com</b> Check any VIN number before you decide to buy a used car. Simply search the VIN number to lookup a free vehicle history report.',
                image: 'img/ica-slidebox-img-1.png',
            },
            {
                title: 'What is Within?',
                description: '<b>Within.com</b> A vehicle history report is the primary product offered by Within.com. We have designed our site to offer you a full vehicle history report related to any VIN number.',
                image: 'img/ica-slidebox-img-2.png',
            }
        ];
        // the root left menu should be disabled on the tutorial page
        this.menu.enable(false);
    }

    ionViewWillLeave() {
        // enable the root left menu when leaving the tutorial page
        this.menu.enable(true);
    }

}
