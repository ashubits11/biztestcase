import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationUserDetailListingRoutingModule } from './application-user-detail-listing-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ApplicationUserDetailListingComponent } from './application-user-detail-listing.component';
import { UsersListingComponent } from './users-listing/users-listing.component';
import { ApplicationGroupApplicationsListingComponent } from './application-group-applications-listing/application-group-applications-listing.component';
import { ApplicationSharedComponentsModule } from '../application-shared-components/application-shared-components.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationCenterModule } from '../common/common';
import { ApplicationGroupUserService } from './application-group-user.service';
import { UserService } from './user.service';
import { ApplicationGroupService } from '../application-group-detail/application-group.service';
@NgModule({
  imports: [
    CommonModule,
    ApplicationUserDetailListingRoutingModule,
    SharedModule,
    ApplicationSharedComponentsModule,
    NotificationCenterModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    UsersListingComponent,
    ApplicationGroupApplicationsListingComponent,
    ApplicationUserDetailListingComponent
  ],
  exports: [
    ApplicationUserDetailListingComponent
  ],
  providers: [
    ApplicationGroupUserService,
    ApplicationGroupService,
    UserService
  ]
})
export class ApplicationsUserDetailModule { }
