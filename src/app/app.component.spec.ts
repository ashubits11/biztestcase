import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import {
  Route
} from '@angular/router';
import {
  RouterTestingModule
} from '@angular/router/testing';
// import { LoaderService } from './core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from './core/error-handling/error-handling.service';

import { AuthorizationService } from './core/_services/authorization.service';
import { MockBackend } from '@angular/http/testing';
import { HttpService } from './core/_services/http.service';
import { AuthenticationService } from './core/_services/authentication.service';

const mockHttpProvider = {
  deps: [MockBackend, BaseRequestOptions],
  useFactory: (backend: MockBackend, defaultOptions: BaseRequestOptions) => {
    return new Http(backend, defaultOptions);
  }
};
let app;


describe('AppComponent', () => {
  beforeEach(async(() => {
    const config: Route[] = [
    ];
    TestBed.configureTestingModule({
      imports: [SharedModule, CoreModule, RouterTestingModule.withRoutes(config)],
      declarations: [
        AppComponent
      ],
      providers: [
        HttpService,
        // LoaderService,
        AdalService,
        AuthHttp,
        ErrorHandlingService,
        AuthorizationService,
        { provide: Http, useValue: mockHttpProvider },
        MockBackend,
        BaseRequestOptions,
      ]

    }).compileComponents();
  }));
  beforeEach(() => {
    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });


  // beforeEach(inject([MockBackend, HttpService, ConfigService], (mockBackend, httpService, config) => {
  //   mockBackend.connections.subscribe(conn => {
  //     conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(['data']) })));
  //   });
  //   config.init();

  // }));

  beforeEach(inject([MockBackend, AuthenticationService], (mockBackend, authService) => {
    mockBackend.connections.subscribe(conn => {
      conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(['data']) })));
    });

  }));

  // it('should create the app', async(() => {
  //   expect(app).toBeTruthy();
  // }));

  // it(`should have as title 'app works!'`, async(() => {
  //   expect(app.title).toEqual('app works!');
  // }));

  // it('should render title in a h1 tag', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('app works!');
  // }));
});
