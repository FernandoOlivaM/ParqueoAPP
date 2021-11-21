import { ChangeDetectorRef, Component } from '@angular/core';
//amplify, do not remove
import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components';
import { FormFieldTypes } from '@aws-amplify/ui-components';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  public selectedIndex = 0;
  public appPages = [
    {
      title: 'Home',
      url: '/tabs',
      icon: 'home-outline',
    },
    {
      title: 'Scan QR',
      url: '/qrscan',
      icon: 'qr-code-outline',
    },
    {
      title: 'Pago de parqueos',
      url: '/payment',
      icon: 'cash-outline',
    },
    {
      title: 'Disponibilidad de parqueos',
      url: '/parking-view',
      icon: 'car-outline',
    }
  ];

  constructor() {
    this.selectedIndex = 0;
  }
  ngOnInit() {
    const path = window.location.pathname.split('/')[1];
    if (path !== undefined) {
      this.selectedIndex = this.appPages.findIndex(page => page.title.toLowerCase() === path.toLowerCase());
    }
   
  }
}
