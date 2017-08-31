import { Component, OnInit, ViewContainerRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from '../application-shared-components/application-shared-components.module';
import { SearchOptions } from '../application-shared-components/application-shared-components.module';
import { ApplicationDropdown } from '../application-shared-components/application-shared-components.module';
import { ApplicationGroup, SelectedContext } from '../application-shared-components/application-shared-components.module';
import { ApplicationGroupService } from './application-group.service';
import { LoadMoreOptions } from '../application-shared-components/application-shared-components.module';
import { NoResultFound } from '../application-shared-components/application-shared-components.module';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { NotificationCenterService } from '../common/common';
import { UserModal, USER_MODAL_TYPE } from '../application-shared-components/application-shared-components.module';
import { Permission } from '../core/core.module';
import { AuthorizationService } from '../core/_services/authorization.service';
import { UserService } from '../application-user-detail-listing/user.service';
@Component({
  selector: 'app-application-group-detail-listing',
  templateUrl: './application-group-detail.component.html'
})
export class ApplicationGroupDetailComponent implements OnInit, OnDestroy {

  searchText: string;
  searchOptions: SearchOptions;
  dropdowns: Array<ApplicationDropdown> = [];
  groups: Array<ApplicationGroup>;
  selectedContext: any;
  loadMoreOptions: LoadMoreOptions;
  noResultFound: NoResultFound;
  size: number;
  selectedGroups: Array<ApplicationGroup>;
  application: Application;
  userModal: UserModal;
  addUser: boolean;
  applicationName: string;
  groupSubject: Subject<any> = new Subject();
  applicationDetailSubject: Subject<any> = new Subject();
  contextSubject: Subject<any> = new Subject();
  showLoader: boolean;
  userModalObj: any;
  activitesFound: any;
  permission: Permission;

  constructor(
    private route: ActivatedRoute,
    private viewRef: ViewContainerRef,
    private notificationCenter: NotificationCenterService,
    private applicationGroupService: ApplicationGroupService,
    private authorizationService: AuthorizationService,
    private userService: UserService
  ) {
    window.scrollTo(0, 0);
    this.searchOptions = new SearchOptions({ placeholder: 'Search Group Name...' });
    this.noResultFound = new NoResultFound();
    this.selectedGroups = new Array();
    this.selectedContext = null;
    this.size = 20;
    this.applicationName = this.route.snapshot.params['id'];
    this.showLoader = false;
    this.searchText = '';
  }

  onSearchUpdate(event: string) {
    this.searchText = event;
  }
  dropdownUpdate(event: any) {
    this.selectedContext = _.cloneDeep(event);
  }
  updateRowsSize(event: number) {
    this.size = event;
  }

  onGroupSelect(event: ApplicationGroup) {
    const index = _.findIndex(this.selectedGroups, function (o: ApplicationGroup) { return o.userGroup === event.userGroup; });
    if (index >= 0) {
      this.selectedGroups.splice(index, 1);
    } else {
      this.selectedGroups.push(event);
    }
  }

  ngOnInit() {
    this.init();
  }
  init() {
    this.activitesFound = this.route.snapshot.data['activitesFound'] || null;
    this.permission = this.authorizationService.getPermissionForApplication(this.activitesFound);
    if (this.activitesFound && this.activitesFound.data.length >= 1) {
      this.showLoader = true;
      const applicationGroups = this.applicationGroupService.getApplicationGroups(this.applicationName);
      const applicationContexts = this.applicationGroupService.getApplicationContext(this.applicationName);
      const applicationGroupDetail = this.applicationGroupService.getApplicationDetail(this.applicationName);
      Observable.forkJoin([applicationGroupDetail, applicationContexts, applicationGroups]).subscribe((results: Array<any>) => {
        // application Detail
        this.applicationDetailSubject.next({ value: true, data: results[0] });
        // application Contexts
        this.contextSubject.next({ value: true, data: results[1], contextTypes: results[0].contextTypes });
        // application groups
        this.groups = _.sortBy(results[2], function(ele) { return ele.userGroup.toLowerCase(); });
        this.loadMoreOptions = new LoadMoreOptions(
          { 'columnsPerRow': 3, 'heightOfContainer': 118, 'totalColumns': this.groups.length }
        );
        this.showLoader = false;
      }, (err: any) => {
      });
    }
  }


  openUserModal() {
    this.userModal = new UserModal();
    this.userModal.groups = this.selectedGroups.map(group => group.userGroup);
    this.userModal.modalType = USER_MODAL_TYPE.addUserModal;
    this.addUser = !this.addUser;
  }

  userModalUpdate(event: any) {
    this.addUser = !this.addUser;
    if (!event) {
      return;
    }else {
      this.userModalObj = event;
      let startDate = null;
      let endDate = null;
      if (this.userModalObj.dates && this.userModalObj.dates.startDate && this.userModalObj.dates.startDate.formatted) {
        startDate = this.userModalObj.dates.startDate.formatted;
      }
      if (this.userModalObj.dates && this.userModalObj.dates.endDate && this.userModalObj.dates.endDate.formatted) {
        endDate = this.userModalObj.dates.endDate.formatted;
      }
      const obj = {
        'from': startDate,
        'to': endDate,
        'users': this.userModalObj.users.map((user: any) => user.id),
        'groups': this.selectedGroups.map((group: ApplicationGroup) => {
          return {
            policyGroup: (group.policyGroupName || null),
            userGroups: group.userGroup
          };
        })
      };
      this.addUserToGroup(obj);
    }
  }

 addUserToGroup(obj: any) {
   this.userService.addUserToGroups(obj, this.applicationName).subscribe((res: any) => {
        this.groupSubject.next('user added');
        this.selectedGroups = [];
        this.notificationCenter.success('New users has been added.');
        this.showLoader = false;
      });
 }

   ngOnDestroy() {
    this.groupSubject.unsubscribe();
    this.contextSubject.unsubscribe();
  }
}
