import { Component, OnInit } from '@angular/core';
import { ApplicationGroupUserService } from '../application-group-user.service';
import { NoResultFound } from '../../application-shared-components/application-shared-components.module';
import { SearchOptions } from '../../application-shared-components/application-shared-components.module';
import { LoadMoreOptions } from '../../application-shared-components/application-shared-components.module';
import { ActivatedRoute } from '@angular/router';
import { NotificationCenterService } from '../../common/common';
import { Permission } from '../../core/_services/permission.interface';
@Component({
  selector: 'app-application-group-applications-listing',
  templateUrl: './application-group-applications-listing.component.html'
})
export class ApplicationGroupApplicationsListingComponent implements OnInit {

  activitys: Array<string>;
  searchText: string;
  searchOptions: SearchOptions;
  noResultFound: NoResultFound;
  size: number;
  loadMoreOptions: LoadMoreOptions;
  applicationName: string;
  userGroupName: string;
  policyGroupName: string;
  permission: Permission;
  constructor(private applicationUserGroupService: ApplicationGroupUserService,
              private activatedRoute: ActivatedRoute,
              private notificationCenter: NotificationCenterService
  ) {
    this.searchOptions = new SearchOptions({ placeholder: 'Search Activity Name...' });
    this.noResultFound = new NoResultFound();
    this.applicationName = this.activatedRoute.parent.snapshot.params['id'];
    this.userGroupName = this.activatedRoute.parent.snapshot.params['userGroupName'];
    this.policyGroupName = this.activatedRoute.parent.snapshot.params['policyGroupName'];
  }
  ngOnInit() {
      this.permission = this.activatedRoute.snapshot.data['activitesFound'] || new Permission();
    if (this.permission && this.permission.havePermissions) {
      console.log(this.permission);
    }
   this.applicationUserGroupService.getApplicationGroupActivities(this.applicationName, this.userGroupName, this.policyGroupName || null)
      .subscribe((activitys: Array<string>) => {
        this.activitys = activitys;
         this.loadMoreOptions = new LoadMoreOptions({
       'columnsPerRow': 3, 'heightOfContainer': 118, 'totalColumns': this.activitys.length
      });
    }, ( err: any) => {
      //  this.notificationCenter.danger(err);
       this.activitys = [];
      });
  }
  onSearchUpdate(event: string) {
    this.searchText = event;
  }
  updateRowsSize (event: number) {
    this.size = event;
  }
}
