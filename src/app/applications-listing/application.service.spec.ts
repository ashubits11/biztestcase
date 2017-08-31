import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { ApplicationService } from './application.service';

describe('ApplicationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApplicationService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  let service;
  beforeEach(inject([ApplicationService], (_service: ApplicationService) => {
    service = _service;
  }));
//   it('should be created', () => {
//     expect(service).toBeTruthy();
//   });
//   describe('uccess Response', () => {
//     const res = [ { test : 'data' } ];
//     beforeEach(inject([MockBackend], (mockBackend) => {
//       mockBackend.connections.subscribe(conn => {
//         conn.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(res)})));
//       });
//     }));
//     it('should getAllApplications', () => {
//       const result = service.getAllApplications();
//       expect(result).toEqual(jasmine.any(Observable));

//       result.subscribe((data) => {
//         expect(res.toString()).toBe(data.toString());
//       });
//     });
//     it('should getApplicationDetail', () => {
//       const result = service.getApplicationDetail('app name');
//       expect(result).toEqual(jasmine.any(Observable));

//       result.subscribe((data) => {
//         expect(res.toString()).toBe(data.toString());
//       });
//     });
//     it('should getApplicationContext', () => {
//       const result = service.getApplicationContext('app name');
//       expect(result).toEqual(jasmine.any(Observable));

//       result.subscribe((data) => {
//         expect(res.toString()).toBe(data.toString());
//       });
//     });
//     it('should updateApplication', () => {
//       const result = service.updateApplication({name: 'app name'});
//       expect(result).toEqual(jasmine.any(Observable));
//       result.subscribe((data) => {
//         expect(res.toString()).toBe(data.toString());
//       });
//     });
//   });
//   describe('error Response', () => {
//     beforeEach(inject([MockBackend], (mockBackend) => {
//       mockBackend.connections.subscribe(conn => {
//         conn.mockError(new Response(new ResponseOptions({status: 500, body: {error: 'err'}})));
//       });
//     }));

//     it('should getAllApplications', () => {
//       const result = service.getAllApplications();
//       expect(result).toEqual(jasmine.any(Observable));

//       result.subscribe((data) => {
//         // this will not be called
//       }, (err) => {
//         expect(err.slice( 0, 3 )).toBe('500');
//       });
//     });

//     it('should getApplicationDetail', () => {
//       const result = service.getApplicationDetail('app name');
//       expect(result).toEqual(jasmine.any(Observable));

//       result.subscribe((data) => {
//         // this will not be called
//       }, (err) => {
//         console.log(err);
//       expect(err.slice( 0, 3 )).toBe('500');
//       });
//     });

//     it('should getApplicationContext', () => {
//       const result = service.getApplicationContext('app name');
//       expect(result).toEqual(jasmine.any(Observable));

//       result.subscribe((data) => {
//         // this will not be called
//       }, (err) => {
//         console.log(err);
//       expect(err.slice( 0, 3 )).toBe('500');
//       });
//     });

//     it('should updateApplication', () => {
//       const result = service.updateApplication({name: 'app name'});
//       expect(result).toEqual(jasmine.any(Observable));

//       result.subscribe((data) => {
//         // this will not be called
//       }, (err) => {
//         expect(err.slice( 0, 3 )).toBe('500');
//       });
//     });
  });

