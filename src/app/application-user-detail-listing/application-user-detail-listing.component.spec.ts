import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationUserDetailListingComponent } from './application-user-detail-listing.component';
import { ApplicationSharedComponentsModule } from '../application-shared-components/application-shared-components.module';
import { SharedModule } from '../shared/shared.module';
import { Observable } from 'rxjs/Observable';
import { ApplicationGroupService } from '../application-group-detail/application-group.service';
import { MockBackend } from '@angular/http/testing';
import { HttpService } from '../core/_services/http.service';
import { LoaderService } from '../core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from '../core/error-handling/error-handling.service';
import { SecretService } from '../core/_services/secret.service';
import { AuthorizationService } from '../core/_services/authorization.service';

describe('ApplicationUserDetailListingComponent', () => {
  let component: ApplicationUserDetailListingComponent;
  let fixture: ComponentFixture<ApplicationUserDetailListingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, ApplicationSharedComponentsModule, SharedModule ],
      declarations: [ ApplicationUserDetailListingComponent ],
      providers: [
        ApplicationGroupService,
        HttpService,
        LoaderService,
        AdalService,
        AuthHttp,
        ErrorHandlingService,
        SecretService,
        AuthorizationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
        ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationUserDetailListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(inject([MockBackend], (mockBackend) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(['data'])})));
    });
  }));

  // it('should be created', () => {
  //   expect(component).toBeTruthy();
  // });
});

