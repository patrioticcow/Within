import { Component } from '@angular/core';
import { NavController, PopoverController, ViewController } from 'ionic-angular';

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="close()">Within</button>
      <button ion-item (click)="close()">Documentation</button>
      <button ion-item (click)="close()">Showcase</button>
      <button ion-item (click)="close()">GitHub Repo</button>
    </ion-list>
  `
})
class PopoverPage {

  constructor(private viewCtrl: ViewController) {

  }

  close() {
    this.viewCtrl.dismiss();
  }
}

@Component({
  templateUrl: 'build/pages/about/about.html'
})
export class AboutPage {
  conferenceDate = '2047-05-17';

  constructor(private nav: NavController, public popoverCtrl: PopoverController) {}

  presentPopover(event) {
    let popover = this.popoverCtrl.create(PopoverPage);
    //popover.present(popover, { ev: event });
    popover.present({ ev: event });
  }
}
