import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApplicationContainerComponent } from './application-container.component';
import { SharedModule } from '../../shared/shared.module';
import * as ng2tooltip from 'ng2-tooltip';
import { Application } from './application-container.interface';


describe('ApplicationContainerComponent', () => {
  let component: ApplicationContainerComponent;
  let fixture: ComponentFixture<ApplicationContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, SharedModule, ng2tooltip.TooltipModule ],
      declarations: [ ApplicationContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationContainerComponent);
    component = fixture.componentInstance;
    component.application = new Application();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to details page', () => {
    spyOn(component['router'], 'navigate');

    component.goToDetail();
    expect(component['router'].navigate).toHaveBeenCalled();
  });

  it('should get color', () => {
    component.applicationIndex = 0;
    expect(component.getColor()).toBe('brownApp');

    component.applicationIndex = 1;
    expect(component.getColor()).toBe('greyApp');

    component.applicationIndex = 2;
    expect(component.getColor()).toBe('watergreenApp');

    component.applicationIndex = 3;
    expect(component.getColor()).toBe('yellowApp');

    component.applicationIndex = 4;
    expect(component.getColor()).toBe('navyBlueApp');

    component.applicationIndex = 5;
    expect(component.getColor()).toBe('darkGreenApp');

    component.applicationIndex = 6;
    expect(component.getColor()).toBe('darkBrownApp');

    // cycle
    component.applicationIndex = 7;
    expect(component.getColor()).toBe('brownApp');
  });

  it('should set title color class on init', () => {
    component.applicationIndex = 0;
    component.ngOnInit();

    expect(component.tileColorClass).toBe('brownApp');
  });

});
