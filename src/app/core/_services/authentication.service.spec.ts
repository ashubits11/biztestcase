import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './authentication.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';

describe('Authentication service', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationService,
                MockBackend,
                BaseRequestOptions,
                AuthHttp,
                {
                    provide: AdalService,
                    useClass: MockAdalService
                },
                {
                    provide: Http,
                    useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        });
    });

    let authenticationService, adalService;
    beforeEach(inject([AuthenticationService, AdalService], (_authenticationService: AuthenticationService, _adalService: AdalService) => {
        authenticationService = _authenticationService;
        adalService = _adalService;
    }));

    it('should be created', () => {
        expect(authenticationService).toBeTruthy();
    });


    it('should configure adal-service', () => {
        spyOn(adalService, 'init');
        authenticationService.configure({ dummy: 'dummy config value' });
        expect(adalService['init']).toHaveBeenCalled();
    });

    it('should expect login to return nothing', () => {
        expect(authenticationService.login()).toBe(undefined);
    });

    it('should expect adalService.login to have been called', () => {
        const adalServiceLoginSpy = spyOn(adalService, 'login');
        authenticationService.login();
        expect(adalServiceLoginSpy.calls.any()).toBe(true);
    });

    it('should expect adalService.login to have been called without any parameters', () => {
        const adalServiceLoginSpy = spyOn(adalService, 'login');
        authenticationService.login();
        expect(adalServiceLoginSpy.calls.first().args.length).toBe(0);
    });

    it('should expect logout to return nothing', () => {
        expect(authenticationService.logout()).toBe(undefined);
    });

    it('should expect adalService.logout to have been called', () => {
        const adalServiceLogOutSpy = spyOn(adalService, 'logOut');
        authenticationService.logout();
        expect(adalServiceLogOutSpy.calls.any()).toBe(true);
    });

    it('should expect adalService.logOut to have been called without any parameters', () => {
        const adalServiceLogOutSpy = spyOn(adalService, 'logOut');
        authenticationService.logout();
        expect(adalServiceLogOutSpy.calls.any()).toBe(true);
    });

    it('should expect authenticationService.initialize to call handleWindowCallback', async(() => {
        const dummyUserInfo = {};
        const getUserSpy = spyOn(adalService, 'getUser').and.returnValue(Observable.of(dummyUserInfo));
        const adalServiceWindowCallBackSpy = spyOn(adalService, 'handleWindowCallback');
        authenticationService.initialize();
        expect(adalServiceWindowCallBackSpy.calls.any()).toBe(true);
    }));

    it('should expect authenticationService.initialize to call handleWindowCallback without any parameters', async(() => {
        const dummyUserInfo = {};
        const getUserSpy = spyOn(adalService, 'getUser').and.returnValue(Observable.of(dummyUserInfo));
        const adalServiceWindowCallBackSpy = spyOn(adalService, 'handleWindowCallback');
        authenticationService.initialize();
        expect(adalServiceWindowCallBackSpy.calls.first().args.length).toBe(0);
    }));

    it('should expect authenticationService.initialize to handle error response', () => {
        const dummyErrorResponse = {
            dummyStatus: 101,
            dummyMessage: 'Dummy Error Message'
        };
        const getUserSpy = spyOn(adalService, 'getUser').and.returnValue(Observable.throw(dummyErrorResponse));
        authenticationService.initialize();
    });

    it('should expeect authenticationService.initialize to handle success response', async(() => {
        const dummyUserInfo = {
            name: 'John Doe'
        };
        const getUserSpy = spyOn(adalService, 'getUser').and.returnValue(Observable.of(dummyUserInfo));
        authenticationService.initialize();
        expect(authenticationService.userInternal.name).toBe('John Doe');
    }));

    it('should expect  user() to return the current internal user object', () => {
        expect(authenticationService.user).toBe(undefined);
        const dummyUserInfo = {
            name: 'John Doe'
        };
        const getUserSpy = spyOn(adalService, 'getUser').and.returnValue(Observable.of(dummyUserInfo));
        authenticationService.initialize();
        expect(authenticationService.user).toEqual({ name: 'John Doe', isAuthenticated: true });
    });

    it('should expect isAuthenticated to return an Observable', () => {
        expect(authenticationService.isAuthenticated()).toEqual(jasmine.any(Observable));
    });

    it('should expect isAuthenticated to return an Observable of false', () => {
        authenticationService.isAuthenticated().subscribe(
            value => expect(value).toBe(false)
        );
    });

    it('should expect isAuthenticated to return an Observable of isAuthenticated value', () => {
        const dummyUserInfo = {
            name: 'John Doe'
        };
        const getUserSpy = spyOn(adalService, 'getUser').and.returnValue(Observable.of(dummyUserInfo));
        authenticationService.initialize();
        authenticationService.isAuthenticated().subscribe(
            value => expect(value).toBe(true)
        );
    });

});

class MockAdalService {
    userInfo: any = {
        'name': 'John Doe',
        isAuthenticated: true
    };
    init() { }
    login() { }
    logOut() { }
    handleWindowCallback() { }
    getUser() { }
}
