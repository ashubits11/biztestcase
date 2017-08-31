import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { ApplicationSharedComponentsModule } from '../application-shared-components/application-shared-components.module';
import { SharedModule } from '../shared/shared.module';
import { ApplicationGroupDetailComponent } from './application-group-detail.component';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { NotificationCenterModule, NotificationCenterService } from '../common/common';
import { ApplicationService } from '../applications-listing/application.service';
import { ApplicationGroupService } from './application-group.service';
import { ApplicationGroup, SelectedContext } from '../application-shared-components/application-shared-components.module';
import { USER_MODAL_TYPE } from '../application-shared-components/application-shared-components.module';
import { MockBackend } from '@angular/http/testing';
import { HttpService } from '../core/_services/http.service';
import { LoaderService } from '../core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from '../core/error-handling/error-handling.service';
import { SecretService } from '../core/_services/secret.service';
import { AuthorizationService } from '../core/_services/authorization.service';
import { UserService } from '../application-user-detail-listing/user.service';


describe('ApplicationGroupDetailComponent', () => {
  let component: ApplicationGroupDetailComponent;
  let fixture: ComponentFixture<ApplicationGroupDetailComponent>;
  const mockHttpProvider = {
    deps: [MockBackend, BaseRequestOptions],
    useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
      return new Http(backend, defaultOptions);
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ApplicationSharedComponentsModule,
        SharedModule,
        HttpModule,
        NotificationCenterModule,
      ],
      declarations: [
        ApplicationGroupDetailComponent,
      ],
      providers: [
        ApplicationService,
        ApplicationGroupService,
        HttpService,
        LoaderService,
        AdalService,
        AuthHttp,
        ErrorHandlingService,
        SecretService,
        AuthorizationService,
        UserService,
        { provide: Http, useValue: mockHttpProvider },
        MockBackend,
        BaseRequestOptions,
      ]
    })
      .compileComponents();
  }));

  let mockUserService;

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationGroupDetailComponent);
    component = fixture.componentInstance;
    mockUserService = fixture.debugElement.injector.get(UserService);
    fixture.detectChanges();
  });

  beforeEach(inject([MockBackend, HttpService], (mockBackend, httpService) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(['data']) })));
    });
  }));

  it('should be created', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should update search text', () => {
    const searchText = 'updated text';
    component.onSearchUpdate(searchText);
    expect(component.searchText).toBe(searchText);
  });

  it('should update dropdown context', () => {
    const searchContext = new SelectedContext({
      contextAbbr: ['test'],
      contextAbbrValue: [{ key: 'test' }]
    });
    component.dropdownUpdate(searchContext);
    expect(component.selectedContext).toEqual(searchContext);
  });

  it('should update row size', () => {
    const size = 10;
    component.updateRowsSize(size);
    expect(component.size).toBe(size);
  });

  it('should open user modal', () => {
    component.openUserModal();
    expect(component.userModal).toBeDefined();
    expect(component.userModal.groups).toBeDefined();
    expect(component.userModal.groups.toString()).toBe('');
    expect(component.userModal.modalType).toBe(USER_MODAL_TYPE.addUserModal);
    expect(component.addUser).toBeDefined();
  });

  it('should update add user modal', () => {
    component.addUser = false;
    component.userModalUpdate(null);
    expect(component.addUser).toBe(true);

    component.addUser = true;
    component.userModalUpdate(null);
    expect(component.addUser).toBe(false);

    const data = {
      users: [{ id: '1' }],
      selectedGroups: {
        policyGroupName: 'dummy policy group name',
        userGroup: 'dummy grouup'
      },
      dates: {
        startDate: {
          formatted: new Date()
        },
        endDate: {
          formatted: new Date()
        }
      }
    };
    component.applicationName = 'dummy application';
    spyOn(mockUserService, 'addUserToGroups').and.returnValue(
      Observable.of(component.applicationName)
    );
    component.userModalUpdate(data);
    expect(mockUserService.addUserToGroups).toHaveBeenCalled();

  });

  it('should push to empty selected groups on Group Selection', () => {
    const applicationGroup = new ApplicationGroup({
      context: null,
      contextKeys: [],
      userGroup: 'group name',
      description: 'group desc',
      policyGroupName: 'group polacy',
      selected: false
    });
    component.selectedGroups = [];
    component.onGroupSelect(applicationGroup);

    expect(component.selectedGroups.length).toBe(1);
  });

  it('should update selected groups on Group Selection', () => {
    const applicationGroup1 = new ApplicationGroup({
      context: null,
      contextKeys: [],
      userGroup: 'group1',
      description: 'group desc',
      policyGroupName: 'group polacy',
      selected: false
    });
    const applicationGroup2 = new ApplicationGroup({
      context: null,
      contextKeys: [],
      userGroup: 'group2',
      description: 'group desc',
      policyGroupName: 'group polacy',
      selected: false
    });
    component.selectedGroups = [applicationGroup1, applicationGroup2];
    component.onGroupSelect(applicationGroup1);

    expect(component.selectedGroups.length).toBe(1);
  });
});
