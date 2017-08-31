import { Component, Input, ViewChild, ElementRef, Renderer, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application, ApplicationGroup } from '../application-shared-components.module';
import { ApplicationGroupService } from '../../application-group-detail/application-group.service';
import { Permission } from '../../core/_services/permission.interface';
@Component({
  selector: 'app-application-group-information',
  templateUrl: './application-group-information.component.html',
  styleUrls: ['../application-information/application-information.component.css']
})
export class ApplicationGroupInformationComponent implements OnInit {

  @Input() applicationName: string;
  @Input() applicationGroupName: string;
  @Input() policyGroupName: string;
  @Input() permission: Permission;
  applicationGroup: ApplicationGroup;
  edit: boolean;
  oldValue: string;
  firtCharacter: string;
  headerColor: string;
  applicationDetail: Application;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ApplicationGroupService,
    private _renderer: Renderer) {
    this.edit = false;
    this.firtCharacter = 'U';
  }
  @ViewChild('focusOnInput')
  set myInput(_input: ElementRef | undefined) {
    if (_input !== undefined) {
      setTimeout(() => {
        this._renderer.invokeElementMethod(_input.nativeElement, 'focus');
        this.oldValue = this.applicationGroup.description;
      }, 0);
    }
  }

  ngOnInit() {
    this.service.getApplicationGroupsDetail(this.applicationName, this.applicationGroupName, this.policyGroupName).subscribe((res: ApplicationGroup) => {
      this.applicationGroup = res;
      if (this.applicationGroup.name) {
        this.firtCharacter = this.applicationGroup.name.charAt(0).toUpperCase();
      }
    }, (err: any) => {
    });
    this.service.getApplicationDetail(this.applicationName).subscribe((res: Application) => {
      this.applicationDetail = res;
    }, (err: any) => {
    });
    this.headerColor = localStorage.getItem('headerColor');
  }

  goBack() {
    this.router.navigate(['/applications', this.applicationName, 'allUserGroups'], { relativeTo: this.route });
  }
  enableEdit() {
    this.edit = !this.edit;
  }

  updateApplicationGroup(toUpdate: boolean) {
    this.enableEdit();
    if (!toUpdate) {
      this.applicationGroup.description = this.oldValue;
    } else {
      this.service.updateApplicationGroup(this.applicationGroup, this.applicationName, this.applicationGroupName, this.policyGroupName).subscribe((res: ApplicationGroup) => {
      });
    }
  }
}
