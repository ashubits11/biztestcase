import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NoResultFound } from '../../application-shared-components/application-shared-components.module';
import { SearchOptions } from '../../application-shared-components/application-shared-components.module';
import { ApplicationGroupUserService } from '../application-group-user.service';
import { ApplicationGroupUser, PageDetail } from '../../application-shared-components/application-shared-components.module';
import { Subscription } from 'rxjs/Subscription';
import { LoadMoreOptions } from '../../application-shared-components/application-shared-components.module';
import * as _ from 'lodash';
import { UserModal, USER_MODAL_TYPE } from '../../application-shared-components/application-shared-components.module';
import { NotificationCenterService } from '../../common/common';
import { ConfirmModal } from '../../application-shared-components/application-shared-components.module';
import { Permission } from '../../core/_services/permission.interface';
import { AuthorizationService } from '../../core/_services/authorization.service';
import { UserService } from '../user.service';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-users-listing',
  templateUrl: './users-listing.component.html'
})
export class UsersListingComponent implements OnInit {

  searchText: string;
  searchOptions: SearchOptions;
  noResultFound: NoResultFound;
  applicationGroupUsers: Array<ApplicationGroupUser>;
  selectedUsers: Array<ApplicationGroupUser>;
  size: number;
  loadMoreOptions: LoadMoreOptions;
  userModal: UserModal;
  addUser: boolean;
  removeUser: boolean;
  pageDetail: PageDetail;
  applicationName: string;
  userGroupName: string;
  policyGroupName: string;
  showLoader: boolean;
  confirmModal: ConfirmModal;
  permission: Permission;
  constructor(
    private applicationGroupUserService: ApplicationGroupUserService,
    private activatedRoute: ActivatedRoute,
    private notificationCenter: NotificationCenterService,
    private authorizationService: AuthorizationService,
    private userService: UserService
) {
    window.scrollTo(0, 0);
    this.searchOptions = new SearchOptions();
    this.searchOptions.placeholder = 'Search User Name...';
    this.noResultFound = new NoResultFound();
    this.selectedUsers = new Array();
    this.applicationName = this.activatedRoute.parent.snapshot.params['id'];
    this.userGroupName = this.activatedRoute.parent.snapshot.params['userGroupName'];
    this.policyGroupName = this.activatedRoute.parent.snapshot.params['policyGroupName'] || null;
    this.showLoader = false;
  }
  ngOnInit() {
     this.pageDetail = new PageDetail({
        applicationName: this.applicationName,
        userGroupName: this.userGroupName,
        policyGroupName: this.policyGroupName
      });
    this.permission = this.authorizationService.getPermissionForActivity(this.authorizationService.getActivitesForPolicy(this.activatedRoute.snapshot.data['activitesFound'] || null, this.policyGroupName));
    if (this.permission && this.permission.havePermissions && this.permission.viewUser) {
      this.getUsers();
    }
  }


  getUsers(msg?: string) {
    this.showLoader = true;
    this.applicationGroupUserService.getApplicationGroupAllUsers(this.applicationName, this.userGroupName, this.policyGroupName)
      .subscribe((users: Array<ApplicationGroupUser>) => {
        this.applicationGroupUsers = _.sortBy(users, function(ele) { if (ele.name) { return ele.name.toLowerCase(); } });
        this.loadMoreOptions = new LoadMoreOptions({
          'columnsPerRow': 3, 'heightOfContainer': 118, 'totalColumns': this.applicationGroupUsers.length
        });
        this.showLoader = false;
        if (msg) {
          this.notificationCenter.success(msg);
        }
      }, (err: any) => {
        //  this.notificationCenter.danger(err);
        this.applicationGroupUsers = [];
        this.showLoader = false;
      });
  }

  onSearchUpdate(event: string) {
    this.searchText = event;
  }

  onUserSelect(event: ApplicationGroupUser) {
    const index = _.findIndex(this.selectedUsers, function (o) { return o.id === event.id; });
    if (index >= 0) {
      this.selectedUsers.splice(index, 1);
    } else {
      this.selectedUsers.push(event);
    }
  }

  updateRowsSize(event: number) {
    this.size = event;
  }

  openUserModal() {
    this.userModal = new UserModal();
    this.userModal.groups = [this.userGroupName];
    this.userModal.modalType = USER_MODAL_TYPE.addUserModal;
    this.addUser = !this.addUser;
  }

  userModalUpdate(event: any) {
    this.addUser = !this.addUser;
    if (event) {
      let startDate = null;
      let endDate = null;
      if (event.dates && event.dates.startDate && event.dates.startDate.formatted) {
        startDate = this.changeTimeZone(event.dates.startDate.formatted);
      }
      if (event.dates && event.dates.endDate && event.dates.endDate.formatted) {
        endDate = this.changeTimeZone(event.dates.endDate.formatted);
      }
      const obj = {
        'from': startDate,
        'to': endDate,
        'users': event.users.map((user: any) => user.id),
        'groups': [{
          policyGroup: this.policyGroupName,
          userGroups: this.userGroupName
        }]
      };
      this.userService.addUserToGroups(obj, this.applicationName).subscribe((res: any) => {
        this.getUsers('New users has been added.');
      });
    }
  }

  removeModalUpdate(event: any) {
    this.removeUser = !this.removeUser;
    if (event) {
      this.removeServiceCall(this.selectedUsers);
    }
  }

  removeServiceCall( users: any ) {
    const obj = {
        'users': users.map((element: any) => element.id),
        'groups': [{
          policyGroup: this.policyGroupName,
          userGroups: this.userGroupName
        }]
      };
      this.userService.removeUsersFromGroups(obj, this.applicationName).subscribe((res: any) => {
        this.selectedUsers = [];
        this.getUsers('Users has been removed.');
      });
  }

  removeMe(event: ApplicationGroupUser) {
    this.removeServiceCall([event]);
  }

  confirmRemove() {
    this.removeUser = true;
    this.confirmModal = new ConfirmModal({ title: 'Confirm', label: 'Are you sure you want to remove selected users?', buttonName: 'Remove Users', groups: [this.userGroupName] ,
    users: this.selectedUsers.map((element: any) => `${element.name}`)});
  }

  changeTimeZone(givenDate: any) {
    let tempDate: any;
    if (givenDate) {
      tempDate = moment(givenDate).endOf('day').tz('America/Chicago');
      return tempDate._i;
    }else {
      return null;
    }
  }
}
