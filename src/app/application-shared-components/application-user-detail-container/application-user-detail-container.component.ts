import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ApplicationGroupUser, PageDetail } from './application-user-detail-container.interface';
import { UserModal, USER_MODAL_TYPE } from '../add-user-modal/add-user-modal.interface';
import { ApplicationGroupUserService } from '../../application-user-detail-listing/application-group-user.service';
import { ConfirmModal } from '../confirm-modal/confirm-modal.interface';
import { Permission } from '../../core/_services/permission.interface';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-application-user-detail-container',
  templateUrl: './application-user-detail-container.component.html',
  styleUrls: ['../application-group-detail-container/application-group-detail-container.component.css']
})
export class ApplicationUserDetailContainerComponent {
  editUser: boolean;
  removeUser: boolean;
  confirmModal: ConfirmModal;
  @Input() pageDetail: PageDetail;
  @Input() applicationGroupUser: ApplicationGroupUser;
  @Input() permission: Permission;
  @Output() onUserSelect: EventEmitter<ApplicationGroupUser> = new EventEmitter<ApplicationGroupUser>();
  @Output() removeMe: EventEmitter<ApplicationGroupUser> = new EventEmitter<ApplicationGroupUser>();
  constructor(private applicationGroupUserService: ApplicationGroupUserService) {
    this.editUser = false;
    this.removeUser = false;
  }
  onSelected() {
    if (this.permission.deleteUser || this.permission.addUser) {
      this.applicationGroupUser.selected = !this.applicationGroupUser.selected;
      this.onUserSelect.emit(this.applicationGroupUser);
    }
  }
  editUserModalUpdate(event: any) {
    this.editUser = !this.editUser;
    if (event.value) {
      this.applicationGroupUser.from = this.changeTimeZone(event.dates.startDate.formatted);
      this.applicationGroupUser.to = this.changeTimeZone(event.dates.endDate.formatted);
      this.applicationGroupUserService.updateApplicationGroupUser(this.pageDetail.applicationName, this.pageDetail.userGroupName, this.applicationGroupUser, this.pageDetail.policyGroupName).subscribe((res: any) => {
      }, (err: any) => {
      });
    }
  }

  confirmRemove() {
    this.removeUser = true;
    this.confirmModal = new ConfirmModal({ label: 'Are you sure you want to remove user?', title: 'Confirm', buttonName: 'Remove', groups: [this.pageDetail.userGroupName], users: [this.applicationGroupUser.name] });
  }

  removeModalUpdate(event: any) {
    this.removeUser = !this.removeUser;
    if (event) {
      this.removeMe.emit(this.applicationGroupUser);
      /*this.applicationGroupUserService.removeApplicationGroupUser(this.pageDetail.applicationName, this.pageDetail.userGroupName, this.applicationGroupUser, this.pageDetail.policyGroupName).subscribe((res: any) => {
        console.log(res);
        this.removeMe.emit(this.applicationGroupUser);
      }, (err: any) => {
        console.log(err);
      });*/
    }
  }

  changeTimeZone(givenDate: any) {
    let tempDate: any;
    if (givenDate) {
      tempDate = moment(givenDate).endOf('day');
      tempDate.tz('America/Chicago');
      return tempDate._i;
    }else {
      return null;
    }
  }

}
