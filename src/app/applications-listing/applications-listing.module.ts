import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationsListingComponent } from './applications-listing.component';
import { ApplicationsListingRoutingModule } from './applications-listing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApplicationSharedComponentsModule } from '../application-shared-components/application-shared-components.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationCenterModule } from '../common/common';
import { ApplicationService } from './application.service';
@NgModule({
  imports: [
    CommonModule,
    ApplicationsListingRoutingModule,
    SharedModule,
    ApplicationSharedComponentsModule,
    NotificationCenterModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    ApplicationsListingComponent
  ],
  exports: [
    ApplicationsListingComponent
  ],
  providers: [
    ApplicationService
  ]
})
export class ApplicationsListingModule { }
