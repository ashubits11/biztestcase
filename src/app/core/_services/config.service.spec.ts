import { XHRBackend, HttpModule, BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { ConfigService } from './config.service';
import { LoaderService } from '../loader/loader.service';
import { AuthenticationService } from './authentication.service';
import { SecretService } from './secret.service';
import { AdalService } from 'ng2-adal/services';


describe('ConfigService', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpModule
            ],
            providers: [
                ConfigService,
                AuthenticationService,
                AdalService,
                SecretService,
                MockBackend,
                BaseRequestOptions,
                {
                provide: Http,
                useFactory: (backend: XHRBackend, options: BaseRequestOptions) => new Http(backend, options),
                deps: [
                    MockBackend,
                    BaseRequestOptions
                ]
                }
            ]
        });
    }));

    let configService;
    let backend;
    let http;
    let secretService;
    let authenticationService;
    beforeEach(inject([ConfigService, MockBackend, Http, SecretService, AuthenticationService], (_configService: ConfigService, _backend: MockBackend, _http: Http, _secretService: SecretService, _authenticationService: AuthenticationService) => {
        configService = _configService;
        backend = _backend;
        http = _http;
        secretService = _secretService;
        authenticationService = _authenticationService;
    }));

    it('should be created', () => {
        expect(configService).toBeTruthy();
    });

    it('should expect configService.init to return a Promise', () => {
        expect(configService.init()).toEqual(jasmine.any(Promise));
    });

    it('should expect configService.init to get data from the server', async(() => {
        const dummyResponse = {
            SAM_ENGINE_ENDPOINT: 'dummy-sam-engine-endpoint',
            SAM_ENGINE_AZURE_CLIENTID: 'dummy-sam-engine-azure-clientid',
            SAM_ADMIN_API_ENDPOINT: 'dummy-sam-admin-api-endpoint',
            SAM_ADMIN_API_AZURE_CLIENTID: 'dummy-sam-admin-api-azure-clientid',
            SAM_ADMIN_UI_AZURE_CLIENTID: 'dummy-sam-admin-ui-azure-clientid'
        };
        const consoleSpy = spyOn(console, 'log');
        spyOn(authenticationService, 'initialize');
        spyOn(authenticationService, 'configure');
        backend.connections.subscribe(
            (connection: MockConnection) => {
                connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(dummyResponse)})));
            }
        );
        const dummyExpectedSecrets = {
            clientId: 'dummy-sam-admin-ui-azure-clientid',
            endpoints: {
                'dummy-sam-engine-endpoint': 'dummy-sam-engine-azure-clientid',
                'dummy-sam-admin-api-endpoint': 'dummy-sam-admin-api-azure-clientid',
            },
            extraQueryParameter: 'domain_hint=ttx.com',
            cacheLocation: 'localStorage'
        };
        configService.init('some-dummy-endpoint').then(
            res => {
                expect(consoleSpy.calls.any()).toBe(true);
                expect(consoleSpy.calls.argsFor(0)[0]).toBe(undefined);
                expect(consoleSpy.calls.argsFor(1)[0]).toBe('---------------completed-------------');
                expect(secretService.secrets).toEqual(dummyExpectedSecrets);
                expect(authenticationService.configure).toHaveBeenCalledWith(dummyExpectedSecrets);
                expect(authenticationService.initialize).toHaveBeenCalledWith();
            }
        );
    }));

    it('should expect configService.init to handle error response by returning only the then part of the promise, in which case the error will never be handled', async(() => {
        const consoleSpy = spyOn(console, 'log');
        backend.connections.subscribe(
            (connection: MockConnection) => connection.mockError(new Error('Some error to handle'))
        );
        configService.init('some-dummy-endpoint').then(
            err => {
                expect(err).toBe(undefined);
                expect(consoleSpy.calls.any()).toBe(true);
                expect(consoleSpy.calls.argsFor(0)[0]).toBe(null);
                expect(consoleSpy.calls.argsFor(1)[0]).toBe('---------------completed-------------');
            }
        );
    }));
});
