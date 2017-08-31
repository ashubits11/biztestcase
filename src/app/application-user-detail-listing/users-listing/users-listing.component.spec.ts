import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { ApplicationSharedComponentsModule } from '../../application-shared-components/application-shared-components.module';
import { UsersListingComponent } from './users-listing.component';
import { SharedModule } from '../../shared/shared.module';
import { Observable } from 'rxjs/Observable';
import { UserModal, USER_MODAL_TYPE } from '../../application-shared-components/application-shared-components.module';
import { ApplicationGroupUser, PageDetail } from '../../application-shared-components/application-shared-components.module';
import { NotificationCenterService } from '../../common/notification-center/notification-center.service';
import { ApplicationGroupUserService } from '../application-group-user.service';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationGroupService } from '../../application-group-detail/application-group.service';
import { AuthorizationService } from '../../core/_services/authorization.service';
import { UserService } from '../user.service';
import { ApplicationsFilterPipe } from '../../application-shared-components/filters/applications-filter.pipe';
import { Permission } from '../../core/_services/permission.interface';
import { IApplicationGroupUser } from '../../application-shared-components/application-user-detail-container/application-user-detail-container.interface';
import { ConfirmModal } from '../../application-shared-components/application-shared-components.module';

describe('UsersListingComponent', () => {
  let component: UsersListingComponent;
  let fixture: ComponentFixture<UsersListingComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        // RouterTestingModule,
        // ApplicationSharedComponentsModule,
        // SharedModule,
        // HttpModule
      ],
      declarations: [
        UsersListingComponent,
        ApplicationsFilterPipe
      ],
      providers: [
        {
          provide: ApplicationGroupUserService,
          useClass: MockApplicationGroupUserService
        },
        {
          provide: ActivatedRoute,
          useClass: MockActivatedRoute
        },
        {
          provide: NotificationCenterService,
          useClass: MockNotificationCenter
        },
        {
          provide: AuthorizationService,
          useClass: MockAuthorizationService
        },
        {
          provide: UserService,
          useClass: MockUserService
        },
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      schemas: [
        NO_ERRORS_SCHEMA
      ]
    })
      .compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(UsersListingComponent);
        component = fixture.componentInstance;
      });
  }));

  let authorizationService;
  let applicationGroupUserService;
  let notificationCenter;
  let userService;
  beforeEach(inject([AuthorizationService, ApplicationGroupUserService, NotificationCenterService, UserService],
    (_authorizationService: AuthorizationService, _applicationGroupUserService: ApplicationGroupUserService, _notificationCenter: NotificationCenterService, _userService: UserService) => {
      authorizationService = _authorizationService;
      applicationGroupUserService = _applicationGroupUserService;
      notificationCenter = _notificationCenter;
      userService = _userService;
    }));

  it('should be created', async(() => {
    fixture.detectChanges();
    expect(component).toBeTruthy();
  }));

  it('should expect pageDetails to be a new PageDetailInstance with supplied route params', () => {
    const dummyPageDetails = new PageDetail({
      applicationName: 'dummy-id',
      userGroupName: 'dummy-user-group-name',
      policyGroupName: 'dummy-policy-group-name'
    });
    fixture.detectChanges();
    expect(component.pageDetail).toEqual(dummyPageDetails);
  });

  it('should expect getUsers to have been called', async(() => {
    spyOn(authorizationService, 'getPermissionForActivity').and.returnValue({ havePermissions: true, viewUser: true });
    spyOn(component, 'getUsers');
    fixture.detectChanges();
    expect(component.getUsers).toHaveBeenCalledWith();
  }));

  it('should expect getUser to handle error', async(() => {
    spyOn(applicationGroupUserService, 'getApplicationGroupAllUsers').and.returnValue(Observable.throw(new Error()));
    fixture.detectChanges();
    component.getUsers();
    expect(component.applicationGroupUsers).toEqual([]);
    expect(component.showLoader).toBe(false);
  }));

  it('should expect getUser to set showLoader to false', async(() => {
    const dummyApplicationGroupAllUsers = [
      'Dummy 1', { name: 'Dummy 2 With Name' }, { name: 'A dummy 3 with Name' }
    ];
    spyOn(applicationGroupUserService, 'getApplicationGroupAllUsers').and.returnValue(Observable.of(dummyApplicationGroupAllUsers));
    spyOn(notificationCenter, 'success');
    fixture.detectChanges();
    component.getUsers('dummy-msg-string');
    expect(component.applicationGroupUsers).toEqual([
      { name: 'A dummy 3 with Name' },
      { name: 'Dummy 2 With Name' },
      'Dummy 1'
    ]);
    expect(component.loadMoreOptions.totalColumns).toBe(3);
    expect(component.showLoader).toBe(false);
    expect(notificationCenter.success).toHaveBeenCalledWith('dummy-msg-string');
  }));

  it('should not call notificationCenter on success', async(() => {
    const dummyApplicationGroupAllUsers = [
      'Dummy 1', { name: 'Dummy 2 With Name' }, { name: 'A dummy 3 with Name' }
    ];
    spyOn(applicationGroupUserService, 'getApplicationGroupAllUsers').and.returnValue(Observable.of(dummyApplicationGroupAllUsers));
    spyOn(notificationCenter, 'success');
    fixture.detectChanges();
    component.getUsers();
    expect(notificationCenter.success).not.toHaveBeenCalled();
  }));

  it('should call not notification center', async(() => {
    spyOn(applicationGroupUserService, 'getApplicationGroupAllUsers').and.returnValue(Observable.throw(new Error()));
    spyOn(notificationCenter, 'success');
    expect(notificationCenter.success).not.toHaveBeenCalled();
  }));

  it('should expect onSearchUpdate to set the searcTest property', () => {
    component.onSearchUpdate('dummy-event');
    expect(component.searchText).toBe('dummy-event');
  });

  it('should expect onUserSelect remove the matching selected applicationUser from the applicationUserGroup list', () => {
    const someDummyApplicationGroupUser: IApplicationGroupUser = new ApplicationGroupUser({
      from: 'Dummy From 2',
      id: 'Dummy Id 2',
      name: 'Dummy Name 2',
      to: 'Dummy To 2',
      selected: false
    });
    const dummyApplicationGroupUsers: Array<IApplicationGroupUser> = [
      new ApplicationGroupUser({
        from: 'Dummy From 1',
        id: 'Dummy Id 1',
        name: 'Dummy Name 1',
        to: 'Dummy To 1',
        selected: false
      }),
      new ApplicationGroupUser({
        from: 'Dummy From 2',
        id: 'Dummy Id 2',
        name: 'Dummy Name 2',
        to: 'Dummy To 2',
        selected: true
      }),
      new ApplicationGroupUser({
        from: 'Dummy From 3',
        id: 'Dummy Id 3',
        name: 'Dummy Name 3',
        to: 'Dummy To 3',
        selected: true
      }),
    ];
    const dummyApplicationGroupAllUsersReduced = [
      dummyApplicationGroupUsers[0],
      dummyApplicationGroupUsers[2]
    ];
    component.selectedUsers = dummyApplicationGroupUsers;
    const initialSelectedLength = component.selectedUsers.length;
    fixture.detectChanges();
    component.onUserSelect(someDummyApplicationGroupUser);
    expect(component.selectedUsers.length).toBe(initialSelectedLength - 1);
    expect(component.selectedUsers).toEqual(dummyApplicationGroupAllUsersReduced);
  });

  it('should expect onUserSelect to add new userGroupChild to the list of selectedUsers', () => {
    const dummyEventNotInSelectedUsers: IApplicationGroupUser = new ApplicationGroupUser({
      from: 'Dummy From 1',
      id: 'Dummy Id 1',
      name: 'Dummy Name 1',
      to: 'Dummy To 1',
      selected: true
    });
    const initialSelectedLength = component.selectedUsers.length;
    component.onUserSelect(dummyEventNotInSelectedUsers);
    expect(component.selectedUsers.length).toBe(initialSelectedLength + 1);
    expect(component.selectedUsers).toContain(dummyEventNotInSelectedUsers);
    expect(component.selectedUsers.indexOf(dummyEventNotInSelectedUsers)).toBe(component.selectedUsers.length - 1);
  });

  it('should expect updateRowsSize to set size to 1', () => {
    component.updateRowsSize(1);
    expect(component.size).toBe(1);
  });

  it('should expect openUserModal to create a new userModal', () => {
    expect(component.userModal).toBe(undefined);
    component.openUserModal();
    expect(component.userModal).toEqual(jasmine.any(UserModal));
  });

  it('should expect openUserModal to set user modal groups', () => {
    component.openUserModal();
    expect(component.userModal.groups).toEqual(['dummy-user-group-name']);
  });

  it('should expect openUserModal to set user modal type', () => {
    component.openUserModal();
    expect(component.userModal.modalType).toBe('ADD_USER_MODAL');
  });

  it('should expect userModal to negate addUser', () => {
    component.addUser = false;
    fixture.detectChanges();
    component.openUserModal();
    expect(component.addUser).toBe(true);
  });

  it('should expect userModalUpdate to negate addUser', () => {
    component.addUser = true;
    component.userModalUpdate(undefined);
    expect(component.addUser).toBe(false);
  });

  it('should expect userModalUpdate to call addUserToGroups with a null "from" value', async(() => {
    spyOn(userService, 'addUserToGroups').and.returnValue(Observable.of('some-dummy-response'));
    spyOn(applicationGroupUserService, 'getApplicationGroupAllUsers').and.returnValue(Observable.of('some-dummy-response'));
    const dummyEvent = {
      dates: {
        startDate: null,
        endDate: {
          formatted: '01-01-1977'
        }
      },
      users: [
        { name: 'Dummy User 1', id: 1 },
        { name: 'Dummy User 1', id: 1 }
      ]
    };
    const dummyCallObject = {
      'from': null,
      'to': '01-01-1977',
      'users': [1, 1],
      'groups': [{
        policyGroup: 'dummy-policy-group-name',
        userGroups: 'dummy-user-group-name'
      }]
    };
    fixture.detectChanges();
    component.userModalUpdate(dummyEvent);
    expect(userService.addUserToGroups).toHaveBeenCalledWith(dummyCallObject, 'dummy-id');
  }));

  it('should expect userModalUpdate to call addUserToGroups with a null "to" value', () => {
    spyOn(userService, 'addUserToGroups').and.returnValue(Observable.of('some-dummy-response'));
    spyOn(applicationGroupUserService, 'getApplicationGroupAllUsers').and.returnValue(Observable.of('some-dummy-response'));
    const dummyEvent = {
      dates: {
        endDate: null,
        startDate: {
          formatted: '01-01-1977'
        }
      },
      users: [
        { name: 'Dummy User 1', id: 1 },
        { name: 'Dummy User 1', id: 1 }
      ]
    };
    const dummyCallObject = {
      'from': '01-01-1977',
      'to': null,
      'users': [1, 1],
      'groups': [{
        policyGroup: 'dummy-policy-group-name',
        userGroups: 'dummy-user-group-name'
      }]
    };
    fixture.detectChanges();
    component.userModalUpdate(dummyEvent);
    expect(userService.addUserToGroups).toHaveBeenCalledWith(dummyCallObject, 'dummy-id');
  });

  it('should expect getUsers to be called with "New users has been added"', () => {
    spyOn(userService, 'addUserToGroups').and.returnValue(Observable.of('some-dummy-response'));
    spyOn(applicationGroupUserService, 'getApplicationGroupAllUsers').and.returnValue(Observable.of('some-dummy-response'));
    spyOn(component, 'getUsers');
    const startDummyEvent = {
      dates: {
        endDate: null,
        startDate: {
          formatted: '01-01-1977'
        }
      },
      users: [
        { name: 'Dummy User 1', id: 1 },
        { name: 'Dummy User 1', id: 1 }
      ]
    };
    fixture.detectChanges();
    component.userModalUpdate(startDummyEvent);
    expect(component.getUsers).toHaveBeenCalledWith('New users has been added.');
    const endDummyEvent = {
      dates: {
        endDate: null,
        startDate: {
          formatted: '01-01-1977'
        }
      },
      users: [
        { name: 'Dummy User 1', id: 1 },
        { name: 'Dummy User 1', id: 1 }
      ]
    };
    component.userModalUpdate(startDummyEvent);
    expect(component.getUsers).toHaveBeenCalledWith('New users has been added.');
  });

  it('should expect removeModalUpdate to negate removeUser', () => {
    component.removeUser = true;
    fixture.detectChanges();
    component.removeModalUpdate(undefined);
    expect(component.removeUser).toBe(false);
  });

  it('should expect removeModalUpdate to call removeServiceCall with list of selected users', () => {
    spyOn(component, 'removeServiceCall');
    const dummySelectedUsers = [
      new ApplicationGroupUser({
        from: 'Dummy From 1',
        id: 'Dummy Id 1',
        name: 'Dummy Name 1',
        to: 'Dummy To 1',
        selected: false
      }),
      new ApplicationGroupUser({
        from: 'Dummy From 2',
        id: 'Dummy Id 2',
        name: 'Dummy Name 2',
        to: 'Dummy To 2',
        selected: true
      })
    ];
    component.selectedUsers = dummySelectedUsers;
    component.removeModalUpdate(true);
    expect(component.removeServiceCall).toHaveBeenCalledWith(dummySelectedUsers);
  });

  it('should expect removeModalUpdate not to call removeServiceCall', () => {
    spyOn(component, 'removeServiceCall');
    component.removeModalUpdate(undefined);
    expect(component.removeServiceCall).not.toHaveBeenCalled();
  });

  it('should expect removeServiceCall to set selectedUsers to an empty list', () => {
    spyOn(userService, 'removeUsersFromGroups').and.returnValue(Observable.of('some-dummy-any-response'));
    spyOn(component, 'getUsers');
    const dummyUsers = [
      { name: 'Dummy Name 1', id: 1 },
      { name: 'Dummy Name 2', id: 2 }
    ];
    const dummyUserObjForCall = {
      users: [1, 2],
      groups: [
        { policyGroup: 'dummy-policy-group-name' },
        { userGroups: 'dummy-user-group-name' }
      ]
    };
    component.selectedUsers = [
      new ApplicationGroupUser({
        from: 'Dummy From 1',
        id: 'Dummy Id 1',
        name: 'Dummy Name 1',
        to: 'Dummy To 1',
        selected: false
      }),
      new ApplicationGroupUser({
        from: 'Dummy From 2',
        id: 'Dummy Id 2',
        name: 'Dummy Name 2',
        to: 'Dummy To 2',
        selected: true
      })
    ];
    fixture.detectChanges();
    component.removeServiceCall(dummyUsers);
    expect(component.selectedUsers).toEqual([]);
    expect(component.getUsers).toHaveBeenCalledWith('Users has been removed.');
  });

  it('should expect removeMe to call removeServiceCall', () => {
    spyOn(component, 'removeServiceCall');
    const dummyEvent: IApplicationGroupUser = new ApplicationGroupUser({
      from: 'Dummy From 2',
      id: 'Dummy Id 2',
      name: 'Dummy Name 2',
      to: 'Dummy To 2',
      selected: true
    });
    component.removeMe(dummyEvent);
    expect(component.removeServiceCall).toHaveBeenCalledWith([dummyEvent]);
  });

  it('should expect confirmRemove to set removeUser to true', () => {
    component.confirmRemove();
    expect(component.removeUser).toBe(true);
  });

  it('should expect confirmRemove to update confirmModal with new ConfirmModal information', () => {
    const modalBeforeRemove = new ConfirmModal({
      title: 'Dummy Confirm',
      label: 'Dummy Remove Confirm Label',
      buttonName: 'Dummy Remove User',
      groups: ['dummy-groups-name'],
      users: [
        new ApplicationGroupUser({
          from: 'Dummy From 1 Before',
          id: 'Dummy Id 1 Before',
          name: 'Dummy Name 1 Before',
          to: 'Dummy To 1 Before',
          selected: true
        })
      ]
    });
    component.confirmModal = modalBeforeRemove;
    component.userGroupName = 'new-dummy-user-group';
    component.selectedUsers = [
      new ApplicationGroupUser({
        from: 'Dummy From 1 Before',
        id: 'Dummy Id 1 Before',
        name: 'Dummy Name 1 Before',
        to: 'Dummy To 1 Before',
        selected: true
      })
    ];
    const newDummyConfirmModal = new ConfirmModal({
      title: 'Confirm',
      label: 'Are you sure you want to remove selected users?',
      buttonName: 'Remove Users',
      groups: ['new-dummy-user-group'],
      users: ['Dummy Name 1 Before']
    });
    component.confirmRemove();
    expect(component.confirmModal).toEqual(newDummyConfirmModal);
  });

});

class MockApplicationGroupUserService {
  getApplicationGroupAllUsers() { }
}
class MockActivatedRoute {
  parent: any = {
    snapshot: {
      params: {
        id: 'dummy-id',
        userGroupName: 'dummy-user-group-name',
        policyGroupName: 'dummy-policy-group-name'
      }
    }
  };
  snapshot: any = {
    data: {
      activitiesFound: [
        'viewUserGroup',
        'viewUser'
      ]
    }
  };
}
class MockNotificationCenter {
  success() { }
}
class MockAuthorizationService {
  getActivitesForPolicy() { }
  getPermissionForActivity() { }
}
class MockUserService {
  addUserToGroups() { }
  removeUsersFromGroups() { }
}
