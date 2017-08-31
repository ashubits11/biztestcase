import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { EditUserModalComponent } from './edit-user-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { MockBackend } from '@angular/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationGroupUser } from '../application-user-detail-container/application-user-detail-container.interface';
import { DatePickerComponent } from '../../common/ng2-datepicker/ng2-datepicker.component';
import { DatePickerOptions } from '../../common/ng2-datepicker/ng2-datepicker.component';
describe('EditUserModalComponent', () => {
  let component: EditUserModalComponent;
  let fixture: ComponentFixture<EditUserModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule,
        ReactiveFormsModule,
        SharedModule,
        HttpModule,
      ],
      declarations: [ EditUserModalComponent, DatePickerComponent, ],
      providers: [
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserModalComponent);
    component = fixture.componentInstance;
    component.applicationGroupUser = new ApplicationGroupUser();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize component variables', () => {
    expect(component.open).toBeDefined();
    expect(component.form).toBeDefined();
    expect(component.startDateOptions).toBeDefined();
    expect(component.endDateOptions).toBeDefined();
  });

  it('should close form', () => {
    spyOn(component.onUpdate, 'emit');
    component.onCloseForm(true, null);

    expect(component.onUpdate.emit).toHaveBeenCalledWith({ value: true, dates: null});
  });


  it('should dismiss modal', () => {
    spyOn(component.onUpdate, 'emit');
    component.dismissModal({ value: false});
    expect(component.onUpdate.emit).toHaveBeenCalledWith({ value: false});
  });
});
