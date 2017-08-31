import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NavbarComponent } from './navbar.component';
import { MockBackend } from '@angular/http/testing';
import { HttpService } from '../../core/_services/http.service';
import { LoaderService } from '../../core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from '../../core/error-handling/error-handling.service';
import { SecretService } from '../../core/_services/secret.service';
import { AuthorizationService } from '../../core/_services/authorization.service';
import { AuthenticationService } from '../../core/_services/authentication.service';


describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [NavbarComponent],
      providers: [
        HttpService,
        LoaderService,
        AdalService,
        AuthHttp,
        ErrorHandlingService,
        SecretService,
        AuthorizationService,
        AuthenticationService,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home', () => {
    spyOn(component['router'], 'navigate');
    component.home();
    expect(component['router'].navigate).toHaveBeenCalled();
  });
});
