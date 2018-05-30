import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { OperationPopoverPage } from './operation-popover';

@NgModule({
  declarations: [
    OperationPopoverPage,
  ],
  imports: [
    IonicPageModule.forChild(OperationPopoverPage),
  ],
})
export class OperationPopoverPageModule {}
