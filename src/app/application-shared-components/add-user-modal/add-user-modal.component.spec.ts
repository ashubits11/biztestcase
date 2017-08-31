import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { AddUserModalComponent } from './add-user-modal.component';
import { DatePickerComponent } from '../../common/ng2-datepicker/ng2-datepicker.component';
import { DatePickerOptions } from '../../common/ng2-datepicker/ng2-datepicker.component';
import { NoResultFoundComponent } from '../no-result-found/no-result-found.component';
import { ApplicationSearchComponent } from '../application-search/application-search.component';
import { SlimScrollModule } from 'ng2-slimscroll';
import { ApplicationsFilterPipe } from '../filters/applications-filter.pipe';
import { UserService } from '../../application-user-detail-listing/user.service';
import { SharedModule } from '../../shared/shared.module';
import { MockBackend } from '@angular/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Rx';
import { UserModal, USER_MODAL_TYPE } from './add-user-modal.interface';
import { HttpService } from '../../core/_services/http.service';
import { LoaderService } from '../../core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from '../../core/error-handling/error-handling.service';
import { SecretService } from '../../core/_services/secret.service';
import { AuthorizationService } from '../../core/_services/authorization.service';

describe('AddUserModalComponent', () => {
  let component: AddUserModalComponent;
  let fixture: ComponentFixture<AddUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        RouterTestingModule,
        SlimScrollModule,
        SharedModule,
        HttpModule,
      ],
      declarations: [
        AddUserModalComponent,
        DatePickerComponent,
        NoResultFoundComponent,
        ApplicationSearchComponent,
        ApplicationsFilterPipe
      ],
      providers: [
        UserService,
        MockBackend,
        BaseRequestOptions,
        HttpService,
        LoaderService,
        AdalService,
        AuthHttp,
        ErrorHandlingService,
        SecretService,
        AuthorizationService,
        FormBuilder,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  let mockUserService;
  let mockFormBuilder;

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserModalComponent);
    component = fixture.componentInstance;
    component.userModal = new UserModal();
    component.userModal.groups = [];
    mockUserService = fixture.debugElement.injector.get(UserService);
    mockFormBuilder = fixture.debugElement.injector.get(FormBuilder);
    fixture.detectChanges();
  });


  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component variables', () => {
    expect(component.searchOptions).toBeDefined();
    expect(component.noResultFound).toBeDefined();
    expect(component.open).toBeDefined();
    expect(component.form).toBeDefined();
    expect(component.selectedGroups).toBeDefined();
    expect(component.users).toBeDefined();
    expect(component.selectedUsers).toBeDefined();
    expect(component.startDateOptions).toBeDefined();
    expect(component.endDateOptions).toBeDefined();
  });

  xit('should close form', () => {
    spyOn(component.onUpdate, 'emit');
    component.onCloseForm(false, null);

    expect(component.onUpdate.emit).toHaveBeenCalledWith({ value: false, users: [], dates: null });
    component.userModal.groups = ['dummy group'];
    component.selectedUsers = [{ firstName: 'dummy user', lastName: 'dummy User' }];

    component.form = mockFormBuilder.group({
      startDate: {formatted: '01-03-1977'},
      endDate: {formatted: '01-02-1977'}
    });

    const dates = {
      startDate: { formatted: new Date().getTime() },
      endDate: { formatted: new Date().getTime() - 1 }
    };
    fixture.detectChanges();
    component.onCloseForm(true, dates);

    expect(component.errorMessage).toEqual('Start Date can not be greater than End Date');
    // dates.endDate.formatted = new Date().getTime();
    // component.onCloseForm(true, dates);

    // expect(component.errorMessage).toBe(null);
  });

  it('should clear clear userlist', () => {
    component.users = [{ user: '1' }];
    component.clearUsers();
    expect(component.users.length).toBe(0);
  });
  it('should update search', () => {
    const text = 'test 123';
    component.selectedUsers = [{ id: '1' }];
    spyOn(mockUserService, 'searchUser').and.returnValue(
      Observable.of(component.selectedUsers)
    );
    component.onSearchUpdate(text);

    fixture.detectChanges();
    expect(component.selectedUsers[0].selected).toBe(true);
  });

  it('should delete user', () => {
    component.selectedUsers = [{ id: 1 }];
    const deletedUser = component.deleteUser({ id: 1 });
    expect(JSON.stringify(deletedUser)).toEqual(JSON.stringify([{ id: 1 }]));
  });

  it('should confirm user', () => {
    component.confirmUser = false;
    spyOn(component.onUpdate, 'emit');
    component.confirmUserModal({ value: true });
    expect(component.onUpdate.emit).toHaveBeenCalled();

  });

  it('should dismiss modal', () => {
    spyOn(component.onUpdate, 'emit');
    component.dismissModal(undefined);
    expect(component.onUpdate.emit).toHaveBeenCalledWith(undefined);
  });

  it('add user to list', () => {
    const user = {
      selected: true,
      user: '1'
    };
    component.selectedUsers = [user];
    component.addUserToList(user);
    expect(component.selectedUsers.length).toBe(0);

    user.selected = false;
    component.addUserToList(user);
    expect(component.selectedUsers.length).toBe(1);
  });
});
