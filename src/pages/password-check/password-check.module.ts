import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PasswordCheckPage } from './password-check';

@NgModule({
  declarations: [
    PasswordCheckPage,
  ],
  imports: [
    IonicPageModule.forChild(PasswordCheckPage),
  ],
})
export class PasswordCheckPageModule {}
