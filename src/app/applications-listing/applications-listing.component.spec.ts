// import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
// import { ApplicationsListingComponent } from './applications-listing.component';
// import { ApplicationSharedComponentsModule } from '../application-shared-components/application-shared-components.module';
// import { SharedModule } from '../shared/shared.module';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ApplicationService } from './application.service';
// import { Observable } from 'rxjs/Observable';
// import { Application } from '../application-shared-components/application-shared-components.module';
// import { MockBackend } from '@angular/http/testing';
// import { HttpService } from '../core/_services/http.service';
// import { LoaderService } from '../core/loader/loader.service';
// import { AuthHttp, AdalService } from 'ng2-adal/services';
// import { ErrorHandlingService } from '../core/error-handling/error-handling.service';
// import { SecretService } from '../core/_services/secret.service';
// import { AuthorizationService } from '../core/_services/authorization.service';

// describe('ApplicationsLisitngComponent', () => {
//   let component: ApplicationsListingComponent;
//   let fixture: ComponentFixture<ApplicationsListingComponent>;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       imports: [ ApplicationSharedComponentsModule, SharedModule, RouterTestingModule  ],
//       declarations: [ ApplicationsListingComponent ],
//       providers: [
//         ApplicationService,
//         HttpService,
//         LoaderService,
//         AdalService,
//         AuthHttp,
//         ErrorHandlingService,
//         SecretService,
//         AuthorizationService,
//         MockBackend,
//         BaseRequestOptions,
//         {
//           provide: Http,
//           useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
//           deps: [MockBackend, BaseRequestOptions]
//         }
//         ]
//     })
//     .compileComponents();
//   }));

//   beforeEach(() => {
//     fixture = TestBed.createComponent(ApplicationsListingComponent);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//    beforeEach(inject([MockBackend], (mockBackend) => {
//     mockBackend.connections.subscribe(conn => {
//       conn.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(['data'])})));
//     });
//   }));

// //   it('should be created', () => {
// //     expect(component).toBeTruthy();
// //   });


// //   it('should get data on init', () => {
// //     spyOn(component['applicationService'], 'getAllApplications').and.callFake(() => {
// //       return {
// //         subscribe: () => []
// //       };
// //     });

// //     component.ngOnInit();

// //     expect(component['applicationService'].getAllApplications).toHaveBeenCalledWith();

// //   });

// //   it('should set size form event', () => {
// //     const size = 20;
// //     component.updateRowsSize(size);

// //     expect(component.size).toBe(size);
// //   });

// //   it('should set searchText form event', () => {
// //     const text = 'search text';
// //     component.onSearchUpdate(text);

// //     expect(component.searchText).toBe(text);
// //   });


// });

