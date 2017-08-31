import { XHRBackend, Response, ResponseOptions, BaseRequestOptions, Http, HttpModule, ConnectionBackend } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'ng2-adal/services';

import { AuthorizationService } from './authorization.service';
import { SecretService } from './secret.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { Permission } from './permission.interface';

describe('AuthorizationSevice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpModule
      ],
      providers: [
        AuthorizationService,
        {
          provide: SecretService,
          useClass: MockSecretService
        },
        {
          provide: ErrorHandlingService,
          useClass: MockErrorHandlingService
        },
        {
          provide: ConnectionBackend,
          useClass: MockBackend
        },
        MockBackend,
        BaseRequestOptions,
        {
          provide: AuthHttp,
          useFactory: (backend: XHRBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [
            MockBackend,
            BaseRequestOptions
          ]
        }
      ]
    });
  });

  let authorizationService;
  let errorHandlingService;
  let httpService;
  let backend;
  beforeEach(
    inject([AuthorizationService, ErrorHandlingService, AuthHttp, MockBackend], (_authorizationService: AuthorizationService, _errorHandlingService: ErrorHandlingService, _httpService: AuthHttp, _backend: MockBackend) => {
      authorizationService = _authorizationService;
      errorHandlingService = _errorHandlingService;
      httpService = _httpService;
      backend = _backend;
    }));

  it('should be created', () => {
    expect(authorizationService).toBeTruthy();
  });

  it('should expect callSamEngine to return an Observable', () => {
    const dummyUser = 'John Doe';
    const dummyActivities = ['Activity 1', 'Activity 2'];
    const dummyApp = 'Dummy App';
    expect(authorizationService.callSamEngine(dummyUser, dummyActivities, dummyApp))
      .toEqual(jasmine.any(Observable));
  });

  it('should expect callSamEngine to handle error response and throw "null"', () => {
    spyOn(httpService, 'get').and.returnValue(Observable.throw(new Error()));
    authorizationService.callSamEngine().subscribe(
      error => expect(error).toBe(null)
    );
  });

  it('shoud expect callSamEngine to call showError', async(() => {
    const dummyResponse = {
      data: []
    };
    backend.connections.subscribe(
      (connection: MockConnection) => connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(dummyResponse) })))
    );
    spyOn(authorizationService, 'showError');
    authorizationService.callSamEngine('user', [], 'app').subscribe(
      (res: Response) => {
        expect(res).toEqual({ data: [] });
      }
    );
    expect(authorizationService.showError).toHaveBeenCalled();
  }));

  it('should expect callSamEngine not to call showError', async(() => {
    const dummyResponse = {
      data: ['Dummy Data 1']
    };
    backend.connections.subscribe(
      (connection: MockConnection) => connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(dummyResponse) })))
    );
    spyOn(authorizationService, 'showError');
    authorizationService.callSamEngine('user', [], 'app').subscribe(
      (res: Response) => expect(res).toEqual({ data: ['Dummy Data 1'] })
    );
    expect(authorizationService.showError).not.toHaveBeenCalled();
  }));

  xit('should expect showError to call errorHandlingService', () => {
    const dummyErrorObject = {
      message: `You don't have permissions to access this Application.`,
      heading: 'Insufficient Permissions',
      permission: true
    };
    const errorHandlingServiceSpy = spyOn(errorHandlingService, 'show');
    authorizationService.showError();
    expect(errorHandlingServiceSpy.calls.any()).toBe(true);
    expect(errorHandlingServiceSpy.calls.first().args[0]).toEqual(dummyErrorObject);
  });

  it('should expect getActivitesForPolicy to return null', () => {
    const activites = {
      data: [{ name: 'Dummy Activity 1' }, { name: 'Dummy Activity 2' }]
    };
    const policyName = 'Dummy Policy Name Not In Activites List';
    expect(authorizationService.getActivitesForPolicy(activites, policyName))
      .toBe(null);
  });

  it('should expect getActivityForPolicy to return 1 as the index', () => {
    const activites = {
      data: [{ name: 'Dummy Activity 1' }, { name: 'Dummy Activity 2' }]
    };
    const policyName = 'Dummy Activity 2';
    expect(authorizationService.getActivitesForPolicy(activites, policyName))
      .toEqual({ name: 'Dummy Activity 2' });
  });

  it('should expect getPermissionForActivity to return a Permission type', () => {
    expect(authorizationService.getPermissionForActivity())
      .toEqual(jasmine.any(Permission));
  });

  it('should expect getPermissionForActivity to return a plain Permission instance', () => {
    expect(authorizationService.getPermissionForActivity())
      .toEqual(new Permission());
  });

  it('should expect permission.viewApp to be true', () => {
    const dummyPolicyActivity = {
      activitiesFound: [
        'dummyViewApp'
      ]
    };
    expect(authorizationService.getPermissionForActivity(dummyPolicyActivity).viewApp)
      .toBe(true);
  });

  it('should expect permission.updateApp to be true', () => {
    const dummyPolicyActivity = {
      activitiesFound: [
        'dummyUpdateApp'
      ]
    };
    expect(authorizationService.getPermissionForActivity(dummyPolicyActivity).updateApp)
      .toBe(true);
  });

  it('should expect permission.updateUserGroup to be true', () => {
    const dummyPolicyActivity = {
      activitiesFound: [
        'dummyUpdateUserGroup'
      ]
    };
    expect(authorizationService.getPermissionForActivity(dummyPolicyActivity).updateUserGroup)
      .toBe(true);
  });

  it('should expect permission.viewUserGroup to be true', () => {
    const dummyPolicyActivity = {
      activitiesFound: [
        'dummyViewUserGroup'
      ]
    };
    expect(authorizationService.getPermissionForActivity(dummyPolicyActivity).viewUserGroup)
      .toBe(true);
  });

  it('should expect permission.viewUserp to be true', () => {
    const dummyPolicyActivity = {
      activitiesFound: [
        'dummyViewUser'
      ]
    };
    expect(authorizationService.getPermissionForActivity(dummyPolicyActivity).viewUser)
      .toBe(true);
  });

  it('should expect permission.addUser to be true', () => {
    const dummyPolicyActivity = {
      activitiesFound: [
        'dummyAddUser'
      ]
    };
    expect(authorizationService.getPermissionForActivity(dummyPolicyActivity).addUser)
      .toBe(true);
  });

  it('should expect permission.deleteUser to be true', () => {
    const dummyPolicyActivity = {
      activitiesFound: [
        'dummyDeleteUser'
      ]
    };
    expect(authorizationService.getPermissionForActivity(dummyPolicyActivity).deleteUser)
      .toBe(true);
  });

  it('should expect getPermissionForApplication to return type permission', () => {
    expect(authorizationService.getPermissionForApplication())
      .toEqual(jasmine.any(Permission));
  });

  it('should expect permission.viewApp to be true', () => {
    const dummyActivites = {
      data: [
        {
          activitiesFound: [
            'dummyViewApp'
          ]
        }
      ]
    };
    expect(authorizationService.getPermissionForApplication(dummyActivites).viewApp)
      .toBe(true);
  });

  it('should expect permission.viewApp to be false', () => {
    const dummyActivites = {
      data: [
        {
          activitiesFound: [
            'notDummyViewApp'
          ]
        }
      ]
    };
    expect(authorizationService.getPermissionForApplication(dummyActivites).viewApp)
      .toBe(false);
  });

  it('should expect permission.updateApp to be true', () => {
    const dummyActivites = {
      data: [
        {
          activitiesFound: [
            'dummyUpdateApp'
          ]
        }
      ]
    };
    expect(authorizationService.getPermissionForApplication(dummyActivites).updateApp)
      .toBe(true);
  });

  it('should expect permission.updateApp to be false', () => {
    const dummyActivites = {
      data: [
        {
          activitiesFound: [
            'notDummyUpdateApp'
          ]
        }
      ]
    };
    expect(authorizationService.getPermissionForApplication(dummyActivites).updateApp)
      .toBe(false);
  });

  it('should expect permission.addUser to be true', () => {
    const dummyActivites = {
      data: [
        {
          activitiesFound: [
            'dummyAddUser'
          ]
        }
      ]
    };
    expect(authorizationService.getPermissionForApplication(dummyActivites).addUser)
      .toBe(true);
  });

  it('should expect permission.addUser to be false', () => {
    const dummyActivites = {
      data: [
        {
          activitiesFound: [
            'notDummyAddUser'
          ]
        }
      ]
    };
    expect(authorizationService.getPermissionForApplication(dummyActivites).addUser)
      .toBe(false);
  });

  it('should expect handleError to return an Observable', () => {
    expect(authorizationService.handleError('dummyError')).toEqual(jasmine.any(Observable));
  });

  it('should expect handleError to handle an json data as well', () => {
    expect(authorizationService.handleError({ body: JSON.parse('{"message": "Dummy Error"}') }))
      .toEqual(jasmine.any(Observable));
  });

  it('should expect errorHandlingService.show to be called with "Not Authorized"', () => {
    const dummyErrorObject = {
      status: 403
    };
    const errorHandlingShowSpy = spyOn(errorHandlingService, 'show');
    authorizationService.handleError(dummyErrorObject);
    expect(errorHandlingShowSpy.calls.first().args[0]).toBe('Not Authorized.');
  });

  it('should expect errorHandlignService.show to have been called with "Something went wrong!!"', () => {
    const dummyErrorObject = {
      status: 'Not 403 But An Error Occured'
    };
    const errorHandlingShowSpy = spyOn(errorHandlingService, 'show');
    authorizationService.handleError(dummyErrorObject);
    expect(errorHandlingShowSpy.calls.first().args[0]).toBe('Something went wrong!!');
  });




});


class MockAuthHttp {
  get() { }
}
class MockSecretService {
  activityType: Object = {
    VIEW_APP: 'dummyViewApp',
    UPDATE_APP: 'dummyUpdateApp',
    UPDATE_USER_GROUP: 'dummyUpdateUserGroup',
    VIEW_USER_GROUP: 'dummyViewUserGroup',
    VIEW_USER: 'dummyViewUser',
    ADD_USER: 'dummyAddUser',
    DELETE_USER: 'dummyDeleteUser',
  };
  samEngineUrl: any = 'dummy-sam-engine-url';
}
class MockErrorHandlingService {
  show() { }
}
