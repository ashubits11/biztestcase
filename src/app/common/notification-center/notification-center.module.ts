import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationCenterComponent } from './notification-center/notification-center.component';
import { NotificationCenterService } from './notification-center.service';
export * from './notification-center/notification-center.interface';
export * from './notification-center.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [NotificationCenterComponent],
  exports: [
        NotificationCenterComponent
    ],
  providers: [ NotificationCenterService ]
})
export class NotificationCenterModule { }
