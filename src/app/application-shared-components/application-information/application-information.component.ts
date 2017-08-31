import { Component, Input, OnInit, ViewChild, ElementRef, Renderer, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from '../application-container/application-container.interface';
import { ApplicationGroupService } from '../../application-group-detail/application-group.service';
import { Subject } from 'rxjs/Subject';
import { Permission } from '../../core/_services/permission.interface';
import { AuthorizationService } from '../../core/_services/authorization.service';
@Component({
  selector: 'app-application-information',
  templateUrl: './application-information.component.html',
  styleUrls: ['./application-information.component.css']
})
export class ApplicationInformationComponent implements OnInit, OnDestroy {

  @Input() applicationName: string;
  @Input() applicationDetailSubject: Subject<any>;
  @Input() permission: Permission;
  edit: boolean;
  oldValue: string;
  application: Application;
  expandHeader: boolean;
  busy: boolean;
  applicationSubscribe: any;
  disableSeeMore: any;
  firtCharacter: string;
  headerColor: string;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private _renderer: Renderer,
    private applicationGroupService: ApplicationGroupService,
    private authorizationService: AuthorizationService
  ) {
    this.busy = true;
    this.edit = false;
    this.disableSeeMore = {};
    this.disableSeeMore.status = false;
    this.disableSeeMore.height = 0;
    this.firtCharacter = 'U';
  }

  ngOnInit() {
    this.applicationSubscribe = this.applicationDetailSubject.subscribe((event: any) => {
      if (event.value) {
        this.application = event.data;
        if (this.application.display) {
          this.firtCharacter = this.application.display.charAt(0).toUpperCase();
        }
      }
      this.busy = false;
    });
    this.headerColor = localStorage.getItem('headerColor');
  }

  @ViewChild('focusOnInput')
  set myInput(_input: ElementRef | undefined) {
    if (_input !== undefined) {
      setTimeout(() => {
        this._renderer.invokeElementMethod(_input.nativeElement, 'focus');
        this.oldValue = this.application.description;
      }, 0);
    }
  }

  goBack() {
    this.router.navigate(['/applications']);
  }
  enableEdit() {
    this.edit = !this.edit;
    this.expandHeader = false;
  }
  updateApplication(toUpdate: boolean) {
    this.enableEdit();
    if (!toUpdate) {
      this.application.description = this.oldValue;
    } else {
      this.applicationGroupService.updateApplication(this.application).subscribe((res: Application) => {
      });
    }
  }

  ngOnDestroy() {
    delete this.applicationSubscribe;
    this.applicationDetailSubject.unsubscribe();
  }

}
