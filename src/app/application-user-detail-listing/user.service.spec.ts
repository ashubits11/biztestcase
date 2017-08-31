// import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
// import { TestBed, async, inject } from '@angular/core/testing';
// import { MockBackend } from '@angular/http/testing';
// import { Observable } from 'rxjs/Observable';

// import { HttpService } from '../core/_services/http.service';
// import { LoaderService } from '../core/loader/loader.service';
// import { AuthHttp, AdalService } from 'ng2-adal/services';
// import { ErrorHandlingService } from '../core/error-handling/error-handling.service';
// import { SecretService } from '../core/_services/secret.service';
// import { UserService } from './user.service';

// describe('ApplicationService', () => {
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       providers: [
//         UserService,
//         MockBackend,
//         BaseRequestOptions,
//         HttpService,
//         LoaderService,
//         AdalService,
//         AuthHttp,
//         ErrorHandlingService,
//         SecretService,
//         {
//           provide: Http,
//           useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
//           deps: [MockBackend, BaseRequestOptions]
//         }
//       ]
//     });
//   });

//   let service;
//   beforeEach(inject([UserService], (_service: UserService) => {
//     service = _service;
//   }));

//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });

//   describe('success Response', () => {
//     const res = [ {test : 'data'}];
//     beforeEach(inject([MockBackend], (mockBackend) => {
//       mockBackend.connections.subscribe(conn => {
//         conn.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(res)})));
//       });
//     }));

//     it('should search user', () => {
//       const result = service.searchUser('user name');
//       expect(result).toEqual(jasmine.any(Observable));
//       result.subscribe((data) => {
//         expect(result.toString()).toBe(data.toString());
//       });
//     });
//   });
//   describe('error Response', () => {
//     beforeEach(inject([MockBackend], (mockBackend) => {
//       mockBackend.connections.subscribe(conn => {
//         conn.mockError(new Response(new ResponseOptions({status: 500, body: {error: 'err'}})));
//       });
//     }));
//     it('should have err on user search', () => {
//       const result = service.searchUser('user name');
//       expect(result).toEqual(jasmine.any(Observable));
//       result.subscribe((res) => {// this will not be called
//       } , ( err ) => {
//         expect(err).toBe(err);
//       });
//     });
//   });
// });
