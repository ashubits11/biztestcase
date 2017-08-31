import { Component, Input, Output, EventEmitter, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationGroup } from './application-group-detail-container.interface';
import { Subject } from 'rxjs/Subject';
import { Permission } from '../../core/_services/permission.interface';
import { AuthorizationService } from '../../core/_services/authorization.service';
@Component({
  selector: 'app-application-group-detail-container',
  templateUrl: './application-group-detail-container.component.html',
  styleUrls: ['./application-group-detail-container.component.css']
})
export class ApplicationGroupDetailContainerComponent implements OnInit, OnDestroy {

  @Input() group: ApplicationGroup;
  @Input() groupSubject: Subject<any> = new Subject();
  @Output() onGroupSelect: EventEmitter<ApplicationGroup> = new EventEmitter<ApplicationGroup>();
  @Input() activitesFound: any;
  permission: Permission;
  disableTool: boolean;
  userAdded: boolean;
  constructor(private route: ActivatedRoute, private router: Router, private authorizationService: AuthorizationService) {
  }

  ngOnInit() {
    const activites = this.authorizationService.getActivitesForPolicy(this.activitesFound, this.group.policyGroupName);
    this.permission = this.authorizationService.getPermissionForActivity(activites);
    this.groupSubject.subscribe((event: any) => {
      if (this.group.selected) {
        this.userAdded = true;
        this.group.selected = false;

        setTimeout(() => {
          this.userAdded = false;
        }, 5000);
      }
    });
  }

  goToUserDetail() {
    if (this.permission.viewUser || this.permission.viewUserGroup) {
      if (this.group.policyGroupName) {
        this.router.navigate(['../', 'policyGroups', this.group.policyGroupName, 'localUserGroups', this.group.userGroup, 'users'], { relativeTo: this.route });
      } else {
        this.router.navigate(['../', 'localUserGroups', this.group.userGroup, 'users'], { relativeTo: this.route });
      }
    }
  }
  onSelected() {
    if (this.permission.addUser) {
      this.group.selected = !this.group.selected;
      this.onGroupSelect.emit(this.group);
    }
  }

  ngOnDestroy() {
    // this.groupSubject.unsubscribe();
  }
}
