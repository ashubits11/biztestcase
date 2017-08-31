import { Component, OnInit } from '@angular/core';
import { ApplicationGroup } from '../application-shared-components/application-shared-components.module';
import { ActivatedRoute } from '@angular/router';
import { AuthorizationService } from '../core/_services/authorization.service';
import { Permission } from '../core/_services/permission.interface';
@Component({
  selector: 'app-application-user-detail-listing',
  templateUrl: './application-user-detail-listing.component.html'
})
export class ApplicationUserDetailListingComponent implements OnInit {

  applicationGroup: ApplicationGroup;
  applicationName: string;
  applicationGroupName: string;
  policyGroupName: string;
  permission: Permission;
  constructor(private activatedRoute: ActivatedRoute, private authorizationService: AuthorizationService) {
    this.applicationName = this.activatedRoute.snapshot.params['id'];
    this.applicationGroupName = this.activatedRoute.snapshot.params['userGroupName'];
    this.policyGroupName = this.activatedRoute.snapshot.params['policyGroupName'];
  }
  ngOnInit() {
    this.permission = this.authorizationService.getPermissionForActivity(this.authorizationService.getActivitesForPolicy(this.activatedRoute.snapshot.data['activitesFound'] || null, this.policyGroupName));
  }
}
