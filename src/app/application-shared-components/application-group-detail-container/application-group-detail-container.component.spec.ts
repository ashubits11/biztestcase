// import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
// import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
// import { RouterTestingModule } from '@angular/router/testing';
// import { ApplicationGroupDetailContainerComponent } from './application-group-detail-container.component';
// import { SharedModule } from '../../shared/shared.module';
// import * as ng2tooltip from 'ng2-tooltip';
// import { ApplicationGroup } from './application-group-detail-container.interface';
// import { ApplicationGroupContextKeyPipe } from '../filters/application-group-context-key-pipe';
// import { Permission } from '../application-shared-components.module';
// import { MockBackend } from '@angular/http/testing';
// import { HttpService } from '../../core/_services/http.service';
// import { LoaderService } from '../../core/loader/loader.service';
// import { AuthHttp , AdalService} from 'ng2-adal/services';
// import { ErrorHandlingService } from '../../core/error-handling/error-handling.service';
// import { SecretService } from '../../core/_services/secret.service';
// import {AuthorizationService} from '../../core/_services/authorization.service';


// describe('ApplicationGroupDetailContainerComponent', () => {
//   let component: ApplicationGroupDetailContainerComponent;
//   let fixture: ComponentFixture<ApplicationGroupDetailContainerComponent>;

//   const mockHttpProvider = {
//     deps: [ MockBackend, BaseRequestOptions ],
//     useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
//         return new Http(backend, defaultOptions);
//     }
// };
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [ RouterTestingModule,
//                  SharedModule,
//                  ng2tooltip.TooltipModule
//                 ],
//       declarations: [ ApplicationGroupDetailContainerComponent,
//                        ApplicationGroupContextKeyPipe
//                     ],
//        providers: [
//                     AuthorizationService,
//                     HttpService,
//                     AuthHttp,
//                     AdalService,
//                     SecretService,
//                     ErrorHandlingService,
//                     LoaderService,
//                     { provide: Http, useValue: mockHttpProvider },
//                  MockBackend,
//                     BaseRequestOptions,
//                 ],
//     })
//     .compileComponents();
//   });


//   beforeEach(() => {
//     fixture = TestBed.createComponent(ApplicationGroupDetailContainerComponent);
//     component = fixture.componentInstance;
//     component.permission = new Permission();
//     component.group = new ApplicationGroup();
//     fixture.detectChanges();
//   });

//   beforeEach(inject([MockBackend, HttpService], (mockBackend, httpService) => {
//     mockBackend.connections.subscribe(conn => {
//       conn.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(['data'])})));
//     });
//   }));

//   it('should be created', () => {
//     expect(component).toBeTruthy();
//   });

//   it('should navigate to user details page', () => {
//     spyOn(component['router'], 'navigate');

//     component.permission.havePermissions = true;
//     component.permission.viewUser = true;
//     component.group.policyGroupName = 'dummy';
//     component.goToUserDetail();
//     expect(component['router'].navigate).toHaveBeenCalled();
//   });

//   it('should select group', () => {
//     spyOn(component['onGroupSelect'], 'emit');
//     component.permission.addUser = true;
//     component.onSelected();
//     expect(component['onGroupSelect'].emit).toHaveBeenCalled();
//   });

//   it('should be created', () => {
//     spyOn(component.onGroupSelect, 'emit');

//     component.group.selected = false;
//     component.onSelected();
//     expect(component.group.selected).toBe(true);
//     expect(component.onGroupSelect.emit).toHaveBeenCalledWith(component.group);

//     component.group.selected = true;
//     component.onSelected();
//     expect(component.group.selected).toBe(false);
//   });


//   it('should publish user added notifier', () => {
//     component.group.selected = true;
//     component.groupSubject.next({evt: 'dummy'});
//     expect(component.group.selected).toBe(false);
//   });
// });
