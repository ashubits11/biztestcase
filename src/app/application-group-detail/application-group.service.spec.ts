import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend, XHRBackend } from '@angular/http';
import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { ApplicationGroupService } from './application-group.service';
import { HttpService } from '../core/_services/http.service';
import { LoaderService } from '../core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from '../core/error-handling/error-handling.service';
import { SecretService } from '../core/_services/secret.service';
import { AuthorizationService } from '../core/_services/authorization.service';
import { RouterTestingModule } from '@angular/router/testing';

describe('ApplicationGroupService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                RouterTestingModule,
                HttpModule
            ],
            providers: [
                ApplicationGroupService,
                HttpService,
                LoaderService,
                AdalService,
                AuthHttp,
                ErrorHandlingService,
                SecretService,
                AuthorizationService,
                {
                    provide: XHRBackend,
                    useClass: MockBackend
                },
                MockBackend,
                BaseRequestOptions,
            ]
        });
    });


    const mockResponse = {
        data: [
            { id: 0, name: '0' },
            { id: 1, name: '1' },
            { id: 2, name: '2' },
            { id: 3, name: '3' },
        ]
    };
    beforeEach(inject([XHRBackend], (mockBackend) => {
        mockBackend.connections.subscribe(conn => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(mockResponse) })));
        });
    }));
    let service;
    beforeEach(inject([ApplicationGroupService], (_service: ApplicationGroupService) => {
        service = _service;
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should get policy group Url', () => {
        const url = service.getUrl('applicationName', 'groupName', 'policyGroupName');
        expect(url.indexOf('policyGroups') >= 0).toBe(true);
        expect(url.indexOf('localUserGroups') >= 0).toBe(true);
    });

    it('should get local user group Url', () => {
        const url = service.getUrl('applicationName', 'groupName');
        expect(url.indexOf('policyGroups') === -1).toBe(true);
        expect(url.indexOf('localUserGroups') >= 0).toBe(true);
    });

    describe('success Response', () => {
        const res = [{ test: 'data' }];
        beforeEach(inject([XHRBackend], (mockBackend) => {
            mockBackend.connections.subscribe(conn => {
                conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(res) })));
            });
        }));
        // it('should getApplicationGroups', () => {
        //     const result = service.getApplicationGroupsDetail('app name', 'app group name');
        //     expect(result).toEqual(jasmine.any(Observable));

        //     result.subscribe((data) => {
        //         expect(data.toString()).toBe(res.toString());
        //     });
        // });
        // it('should getApplicationContext', () => {
        //     service.getApplicationContext('bd').subscribe((data) => {
        //         expect(data.length).toBe(1);
        //         expect(data[0].test).toEqual('data');
        //     });
        //     // const result = service.getApplicationContext('app name');
        //     //expect(result).toEqual(jasmine.any(Observable));
        // });

        // it('should update application group', () => {
        //     const result = service.updateApplicationGroup('application group', 'application name', 'dummy group', 'dummy policy name');
        //     expect(result).toEqual(jasmine.any(Observable));

        //     result.subscribe((data) => {
        //         expect(data.toString()).toBe(res.toString());
        //     });
        // });

    });

    describe('error Response', () => {
        beforeEach(inject([MockBackend], (mockBackend) => {
            mockBackend.connections.subscribe(conn => {
                conn.mockError(new Response(new ResponseOptions({ status: 500, body: { error: 'err' } })));
            });
        }));


        // it('should getApplicationGroups', () => {
        //     const result = service.getApplicationGroupsDetail('app name', 'app group name');
        //     expect(result).toEqual(jasmine.any(Observable));

        //     result.subscribe((data) => {
        //         // this will not be called
        //     }, (err) => {
        //         expect(err.slice(0, 3)).toBe('500');
        //     });
        // });


        // it('should update application group', () => {
        //     const result = service.updateApplicationGroup('application Name', {});
        //     expect(result).toEqual(jasmine.any(Observable));
        //     result.subscribe((data) => {
        //     }, (err) => {
        //         expect(err.slice(0, 3)).toBe('500');
        //     });
        // });
    });
});
