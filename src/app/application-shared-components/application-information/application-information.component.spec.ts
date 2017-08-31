import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationInformationComponent } from './application-information.component';
import { SharedModule } from '../../shared/shared.module';
import * as ng2tooltip from 'ng2-tooltip';
import { Application } from '../application-shared-components.module';
import { ApplicationService } from '../../applications-listing/application.service';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { MockBackend } from '@angular/http/testing';
import {Subject} from 'rxjs/Subject';
import { ApplicationGroupService } from '../../application-group-detail/application-group.service';
import { HttpService } from '../../core/_services/http.service';
import { LoaderService } from '../../core/loader/loader.service';
import { AuthHttp , AdalService} from 'ng2-adal/services';
import { ErrorHandlingService } from '../../core/error-handling/error-handling.service';
import { SecretService } from '../../core/_services/secret.service';
import {AuthorizationService} from '../../core/_services/authorization.service';

describe('ApplicationInformationComponent', () => {
  let component: ApplicationInformationComponent;
  let fixture: ComponentFixture<ApplicationInformationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        RouterTestingModule,
        SharedModule,
        ng2tooltip.TooltipModule,
        HttpModule
      ],
      declarations: [ ApplicationInformationComponent ],
      providers: [
        ApplicationService,
        MockBackend,
        BaseRequestOptions,
        ApplicationGroupService,
        LoaderService,
        HttpService,
        AdalService,
        AuthHttp,
        ErrorHandlingService,
        SecretService,
        AuthorizationService,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(inject([MockBackend], (mockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(['data'])})));
    });
  }));

  let mockApplicationService;
  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationInformationComponent);
    component = fixture.componentInstance;
    component.application = new Application();
    component.applicationDetailSubject = new Subject();
    mockApplicationService = fixture.debugElement.injector.get(ApplicationService);
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate back', () => {
    spyOn(component['router'], 'navigate');
    component.goBack();
    expect(component['router'].navigate).toHaveBeenCalled();
  });

  it('should enable edit', () => {
    component.edit = false;
    component.enableEdit();
    expect(component.edit).toBe(true);
  });

  it('should update Application to old value', () => {
    spyOn(component, 'enableEdit');
    component.oldValue = 'old value';
    component.application.description = 'new value';
    component.updateApplication(false);

    expect(component.enableEdit).toHaveBeenCalled();
    expect(component.application.description).toBe('old value');
  });

  // it('should fetch and update Application', () => {
  //   spyOn(component, 'enableEdit');
  //   component.updateApplication(true);
  //   expect(component.enableEdit).toHaveBeenCalled();
  //   spyOn(component['applicationService'], 'updateApplication').and.callFake(() => {
  //     return {
  //       subscribe: () => {}
  //     };
  //   });
  //   component.updateApplication(true);
  //   expect(component['applicationService'].updateApplication).toHaveBeenCalled();
  // });

  it('should fetch application details on init', () => {
    component.applicationDetailSubject.next({value: true, data: {display : 'dummy value'}});
    component.ngOnInit();
  });
});
