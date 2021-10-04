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
  user: CognitoUserInterface | undefined
  authState: AuthState;
  formFieldsLogin: FormFieldTypes;
  formFieldsNueva: FormFieldTypes;
  formFieldsForgot:  FormFieldTypes;

  constructor(private ref: ChangeDetectorRef) {
    this.formFieldsLogin = [
      { type: "username", label:"", placeholder: "Ingrese Su usuario"},
      { type: "password", label:"", placeholder: "Ingrese Su contraseña"}
    ];
    this.formFieldsForgot = [
      { type: "username", label:"", placeholder: "Ingrese Su usuario"}
    ];
  }
  async ngOnDestroy() {
    return await onAuthUIStateChange;
  }
  ngOnInit() {
   
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      if (!this.ref['destroyed']) {
        this.ref.detectChanges();
      }
    })
  }
}
