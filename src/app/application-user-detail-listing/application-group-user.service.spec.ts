import { XHRBackend, BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { ApplicationGroupUserService } from './application-group-user.service';
import { HttpService } from '../core/_services/http.service';
import { LoaderService } from '../core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from '../core/error-handling/error-handling.service';
import { SecretService } from '../core/_services/secret.service';
import { AuthorizationService } from '../core/_services/authorization.service';
import { RouterTestingModule } from '@angular/router/testing';
import { Application } from '../application-shared-components/application-shared-components.module';
import { ApplicationGroup } from '../application-shared-components/application-shared-components.module';
import { ApplicationGroupUser } from '../application-shared-components/application-shared-components.module';

describe('ApplicationGroupUserService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [
        ApplicationGroupUserService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: HttpService,
          useFactory: (backend: XHRBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [
            MockBackend,
            BaseRequestOptions
          ]
        }
      ]
    });
  });

  let applicationGroupService;
  let httpService;
  let backend;
  beforeEach(inject([ApplicationGroupUserService, HttpService, MockBackend], (_applicationGroupService: ApplicationGroupUserService, _httpService: HttpService, _backend: MockBackend) => {
    httpService = _httpService;
    applicationGroupService = _applicationGroupService;
    backend = _backend;
  }));

  it('should expect ApplicationGroupUserService to be defined', () => {
    expect(applicationGroupService).not.toBe(undefined);
    expect(applicationGroupService.url).toBe('/applications');
  });

  it('should expect getApplicationGroupAllUsers to all users of the application group', async(() => {
    const dummyResponseData = {
      data: {
        groups: ['Dummy Group 1', 'Dummy Group 2']
      }
    };
    let lastConnection;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        lastConnection = connection;
        connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(dummyResponseData) })));
      }
    );
    applicationGroupService.getApplicationGroupAllUsers().subscribe(
      (res: Response) => {
        expect(res).toEqual({
          data: {
            groups: ['Dummy Group 1', 'Dummy Group 2']
          }
        });
      }
    );
    expect(lastConnection.request.url).toMatch(/applications\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/users/);
  }));

  it('should expect getApplicationGroupAllUsers to handle error response', async(() => {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockError(new Error('Some error occured in the server when getting all application group!'));
      }
    );
    expect(() => applicationGroupService.getApplicationGroupAllUsers().subscribe()).toThrow('Some error occured in the server when getting all application group!');
  }));

  it('should expect getApplicationGroupUser to get an application group user', () => {
    const dummyResponseData = {
      data: {
        user: 'Dummy User'
      }
    };
    let lastConnection;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        lastConnection = connection;
        connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(dummyResponseData) })));
      }
    );
    applicationGroupService.getApplicationGroupUser().subscribe(
      (res: Response) => {
        expect(res).toEqual({
          data: {
            user: 'Dummy User'
          }
        });
      }
    );
    expect(lastConnection.request.url).toMatch(/applications\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/[a-zA-Z0-9]+\/users/);
  });

  it('should expect getApplicationGroupUser to handle error response', async(() => {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockError(new Error('Some error occured in the server when getting application group user!'));
      }
    );
    expect(() => applicationGroupService.getApplicationGroupUser().subscribe()).toThrow('Some error occured in the server when getting application group user!');
  }));

  it('should expect updateApplicationGroupUser to get response data', async(() => {
    const mockResponse = {
      data: ['Some dummy response']
    };
    let lastConnection;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        lastConnection = connection;
        connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      }
    );
    const dummyBody = new ApplicationGroupUser({
      to: '01-01-1977',
      from: '01-02-1977',
      name: 'John Doe',
      id: 'Dummy Id',
      selected: true
    });
    applicationGroupService.updateApplicationGroupUser('dummy application name', 'dummy group name', dummyBody, 'dummy-policy-group-name').subscribe(
      (res: Response) => expect(res).toEqual({ data: ['Some dummy response'] })
    );
    expect(lastConnection.request.url).toMatch(/applications\/[a-zA-Z0-9 -_]+\/[a-zA-Z0-9 -_]+\/[a-zA-Z0-9 -_]+\/users/);
  }));

  it('should expect updateApplicationGroupUser to handle error', () => {
    const dummyBody = new ApplicationGroupUser({
      to: '01-01-1977',
      from: '01-02-1977',
      name: 'John Doe',
      id: 'Dummy Id',
      selected: true
    });
    backend.connections.subscribe(
      (connection: MockConnection) => connection.mockError(new Error('Some server error updating application group user!'))
    );
    expect(() => applicationGroupService.updateApplicationGroupUser('dummy application name', 'dummy group name', dummyBody).subscribe()).toThrow('Some server error updating application group user!');
  });

  it('should expect getApplicationGroupActivities to get response data', async(() => {
    const mockResponse = {
      data: ['Some dummy response']
    };
    let lastConnection;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        lastConnection = connection;
        connection.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
      }
    );
    const dummyBody = new ApplicationGroupUser({
      to: '01-01-1977',
      from: '01-02-1977',
      name: 'John Doe',
      id: 'Dummy Id',
      selected: true
    });
    applicationGroupService.getApplicationGroupActivities('dummy application name', 'dummy group name', 'dummy-policy-group-name').subscribe(
      (res: Response) => expect(res).toEqual({ data: ['Some dummy response'] })
    );
    expect(lastConnection.request.url).toMatch(/applications\/[a-zA-Z0-9 -_]+\/[a-zA-Z0-9 -_]+\/[a-zA-Z0-9 -_]+\/activities/);
  }));

  it('should expect getApplicationGroupActivities to handle error', () => {
    backend.connections.subscribe(
      (connection: MockConnection) => connection.mockError(new Error('Some server error updating application group user!'))
    );
    expect(() => applicationGroupService.getApplicationGroupActivities('dummy application name', 'dummy group name', 'dummy-policy-group-name').subscribe()).toThrow('Some server error updating application group user!');
  });

  it('should expect getUrl to return pattern matching "/applications/dummy-application-name/policyGroups/dummy-policy-group-name/localUSerGroups/dummy-application-group-name"', () => {
    expect(applicationGroupService.getUrl('dummy-application-name', 'dummy-group-name', 'dummy-policy-group-name'))
      .toMatch(/applications\/[a-zA-Z0-9 -_]*\/policyGroups\/[a-zA-Z0-9 -_]*\/localUserGroups\/[a-zA-Z0-9 -_]*/);
  });

  it('should expect getUrl to return pattern matching "/applications/dummy-application-name/localUSerGroups/dummy-application-group-name"', () => {
    expect(applicationGroupService.getUrl('dummy-application-name', 'dummy-group-name'))
      .toMatch(/applications\/[a-zA-Z0-9 -_]*\/localUserGroups\/[a-zA-Z0-9 -_]*/);
  });

  it('should expect handleError to handle error response', () => {
    const dummyError = {
      error: 'Some dummy internal server error'
    };
    const dummyResponseTypeError = new Response(
      new ResponseOptions({
        body: JSON.stringify(dummyError),
        status: 500,
        statusText: 'ERROR'
      })
    );
    expect(() => applicationGroupService.handleError(dummyResponseTypeError).subscribe())
      .toThrow('500 - ERROR || \'\'} Some dummy internal server error');
    const dummyNonEror = new Response(
      new ResponseOptions({
        status: 500,
        statusText: 'ERROR'
      })
    );

    expect(() => applicationGroupService.handleError(dummyNonEror).subscribe())
      .toThrow('500 - ERROR || \'\'} ""');
  });

  it('should expect handleError to handle non-response error', () => {
    const dummyNonResponseErrorWithMessageAttribute = {
      message: 'Some dummy non-response type error with message attribute'
    };
    expect(() => applicationGroupService.handleError(dummyNonResponseErrorWithMessageAttribute).subscribe())
      .toThrow('Some dummy non-response type error with message attribute');
    const dummyNonResponseErrorWithNoMessageAttribute = {
      hasNoMessageAttribute: 'Some dummy non-response type error with non-message attribute'
    };
    expect(() => applicationGroupService.handleError(dummyNonResponseErrorWithNoMessageAttribute).subscribe())
      .toThrow(dummyNonResponseErrorWithNoMessageAttribute.toString());
  });

});

class MockHttpService {
  get() { }
  put() { }
};
