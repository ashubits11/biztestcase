import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { NoResultFoundComponent } from './no-result-found/no-result-found.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { ApplicationUserDetailContainerComponent } from './application-user-detail-container/application-user-detail-container.component';
import { ApplicationSearchComponent } from './application-search/application-search.component';
import { ApplicationInformationComponent } from './application-information/application-information.component';
import { ApplicationGroupInformationComponent } from './application-group-information/application-group-information.component';
import { ApplicationGroupDetailContainerComponent } from './application-group-detail-container/application-group-detail-container.component';
import { AppilicationDetailDropdownComponent } from './appilication-detail-dropdown/appilication-detail-dropdown.component';
import { AddUserModalComponent } from './add-user-modal/add-user-modal.component';
export { UserModal, USER_MODAL_TYPE } from './add-user-modal/add-user-modal.interface';
import { ApplicationContainerComponent } from './application-container/application-container.component';

import { ApplicationsFilterPipe } from './filters/applications-filter.pipe';
import { ContextFilterPipe } from './filters/context-filter.pipe';
import { ApplicationGroupContextPipe } from './filters/application-group-context-pipe';
import { ApplicationGroupContextKeyPipe } from './filters/application-group-context-key-pipe';
export { Application } from './application-container/application-container.interface';

export { ApplicationGroupUser, PageDetail } from
'./application-user-detail-container/application-user-detail-container.interface';
export { ApplicationGroup } from
'./application-group-detail-container/application-group-detail-container.interface';
export { LoadMoreOptions } from './load-more/load-more.interface';
export { ApplicationDropdown, SelectedContext } from
'./appilication-detail-dropdown/application-detail-dropdown.interface';
export { SearchOptions } from
'./application-search/application-search.interface';
export { NoResultFound } from
'./no-result-found/no-result-found.interface';
import * as ng2tooltip from 'ng2-tooltip';
import { ShowTooltipDirective } from './directives/show-tooltip.directive';
import { ConfirmModalComponent } from './confirm-modal/confirm-modal.component';
export { ConfirmModal } from './confirm-modal/confirm-modal.interface';
import { DatePickerModule } from '../common/common';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { EditUserModalComponent } from './edit-user-modal/edit-user-modal.component';
import { CommonSortFilterPipe } from './filters/common-sort-filter.pipe';
export { Permission } from '../core/_services/permission.interface';
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ng2tooltip.TooltipModule,
    DatePickerModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2Bs3ModalModule
  ],
  declarations: [
    NoResultFoundComponent,
    LoadMoreComponent,
    ApplicationUserDetailContainerComponent,
    ApplicationSearchComponent,
    ApplicationInformationComponent,
    ApplicationGroupInformationComponent,
    ApplicationGroupDetailContainerComponent,
    AppilicationDetailDropdownComponent,
    AddUserModalComponent,
    ApplicationContainerComponent,
    ApplicationsFilterPipe,
    ContextFilterPipe,
    ApplicationGroupContextPipe,
    ApplicationGroupContextKeyPipe,
    CommonSortFilterPipe,
    ShowTooltipDirective,
    ConfirmModalComponent,
    EditUserModalComponent
    ],
    exports: [
    NoResultFoundComponent,
    LoadMoreComponent,
    ApplicationUserDetailContainerComponent,
    ApplicationSearchComponent,
    ApplicationInformationComponent,
    ApplicationGroupInformationComponent,
    ApplicationGroupDetailContainerComponent,
    AppilicationDetailDropdownComponent,
    AddUserModalComponent,
    ApplicationContainerComponent,
    ApplicationsFilterPipe,
    ContextFilterPipe,
    ApplicationGroupContextPipe,
    ApplicationGroupContextKeyPipe,
    ApplicationGroupContextPipe,
    ShowTooltipDirective,
    ConfirmModalComponent,
    EditUserModalComponent
    ]
})
export class ApplicationSharedComponentsModule { }
