import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { ApplicationGroupDetailComponent } from './application-group-detail.component';
import { ApplicationSharedComponentsModule } from '../application-shared-components/application-shared-components.module';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationCenterModule } from '../common/common';
import { ApplicationGroupService } from './application-group.service';
import { ApplicationGroupDetailRoutingModule } from './application-group-detail-routing.module';
import { UserService } from '../application-user-detail-listing/user.service';
@NgModule({
  imports: [
    CommonModule,
    ApplicationGroupDetailRoutingModule,
    SharedModule,
    ApplicationSharedComponentsModule,
    NotificationCenterModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    ApplicationGroupDetailComponent,
  ],
  exports: [
    ApplicationGroupDetailComponent
  ],
  providers: [
    ApplicationGroupService,
    UserService
  ]
})
export class ApplicationsGroupDetailModule { }
