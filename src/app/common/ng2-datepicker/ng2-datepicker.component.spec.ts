import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { DatePickerComponent, DateModel } from './ng2-datepicker.component';
import { FormsModule } from '@angular/forms';
import { SlimScrollModule } from 'ng2-slimscroll';
import { EventEmitter } from '@angular/core';

describe('NotificationCenterComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        imports: [
            FormsModule,
            SlimScrollModule
        ],
        declarations: [
            DatePickerComponent
        ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    fixture.nativeElement.click();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should write value', () => {
    component.writeValue(new DateModel({
        day: null,
        month: null,
        year: null,
        formatted: null,
        momentObj: null
    }));

    expect(component.date).toBeDefined();
  });

  it('should register on change callback', () => {
      component.registerOnChange(() => {});
      expect(component['onChangeCallback']).toBeDefined();
  });

  it('should register on touched callback', () => {
      component.registerOnTouched(() => {});
      expect(component['onTouchedCallback']).toBeDefined();
  });

  it('should get prev month', () => {
      spyOn(component, 'generateCalendar');
      component.prevMonth();
      expect(component.generateCalendar).toHaveBeenCalled();
  });

  it('should get next month', () => {
      spyOn(component, 'generateCalendar');
      component.nextMonth();
      expect(component.generateCalendar).toHaveBeenCalled();
  });

  it('should get today', () => {
      spyOn(component, 'selectDate');
      component.today();
      expect(component.selectDate).toHaveBeenCalled();
  });

  it('should toggle', () => {
      spyOn(component, 'onOpen');
      component.opened = false;
      component.toggle();

      expect(component.opened).toBe(true);
      expect(component.onOpen).toHaveBeenCalled();
  });

  it('should open', () => {
      spyOn(component, 'onOpen');
      component.open();

      expect(component.opened).toBe(true);
      expect(component.onOpen).toHaveBeenCalled();
  });

  it('should close', () => {
      spyOn(component.outputEvents, 'emit');
      component.close();

      expect(component.opened).toBe(false);
      expect(component.outputEvents.emit).toHaveBeenCalled();
  });

  it('should unset year picker on open', () => {
      component.onOpen();
      expect(component.yearPicker).toBe(false);
  });

  it('should set year picker on open', fakeAsync(() => {
      component.openYearPicker();
      tick(1);
      expect(component.yearPicker).toBe(true);
  }));

  it('should clear', () => {
      spyOn(component, 'close');
      component.clear();
      expect(component.value.day).toBe(null);
      expect(component.value.month).toBe(null);
      expect(component.value.year).toBe(null);
      expect(component.value.momentObj).toBe(null);
      expect(component.value.formatted).toBe(null);
      expect(component.close).toHaveBeenCalled();
  });

  it('should get current date value', () => {
      component.date = new DateModel({
            day: '1',
            month: '1',
            year: '2017',
            formatted: null,
            momentObj: null
        });
      expect(component.value).toBe(component.date);
  });

  it('should set current date value', () => {
      spyOn(component, 'onChangeCallback');
      component.value = new DateModel({
            day: '1',
            month: '1',
            year: '2017',
            formatted: null,
            momentObj: null
        });
      expect(component['onChangeCallback']).toHaveBeenCalled();
  });

    it('should set current date on init', () => {
        component.options = {initialDate: new Date()};
        component.ngOnInit();
        expect(component.currentDate).toBeDefined();
    });

    it('should set min date on init', () => {
        component.options = {minDate: new Date()};
        component.ngOnInit();
        expect(component.minDate).toBeDefined();
    });

    it('should set max date on init', () => {
        component.options = {maxDate: new Date()};
        component.ngOnInit();
        expect(component.maxDate).toBeDefined();
    });

    it('should toggle with emitted toggle data', fakeAsync(() => {
        spyOn(component, 'toggle');
        component.inputEvents = new EventEmitter();
        component.ngOnInit();

        component.inputEvents.emit({type: 'action', data: 'toggle'});
        tick(10);

        expect(component.toggle).toHaveBeenCalled();
    }));

    it('should open with emitted data', fakeAsync(() => {
        spyOn(component, 'open');
        component.inputEvents = new EventEmitter();
        component.ngOnInit();

        component.inputEvents.emit({type: 'action', data: 'open'});
        tick(10);

        expect(component.open).toHaveBeenCalled();
    }));

    it('should close with emitted data', fakeAsync(() => {
        spyOn(component, 'close');
        component.inputEvents = new EventEmitter();
        component.ngOnInit();

        component.inputEvents.emit({type: 'action', data: 'close'});
        tick(10);

        expect(component.close).toHaveBeenCalled();
    }));


    it('should set date with emitted data', fakeAsync(() => {
        try {
            component.inputEvents = new EventEmitter();
            component.ngOnInit();

            const dt = new DateModel({
                day: '1',
                month: '1',
                year: '2017',
                formatted: null,
                momentObj: null
            });

            component.inputEvents.emit({type: 'setDate', data: dt});
            tick(10);
        } catch (e) {
            expect(e).toBeDefined();
        }
    }));


    it('should set year', fakeAsync(() => {
        spyOn(component, 'generateCalendar');
        component.selectYear(new MouseEvent('click'), 2017);
        tick(10);

        expect(component.value).toBeDefined();
        expect(component.yearPicker).toBe(false);
        expect(component.generateCalendar).toHaveBeenCalled();
    }));

    it('should increment year', fakeAsync(() => {
        spyOn(component, 'generateCalendar');
        component.incrementYear(new MouseEvent('click'), true);
        tick(10);

        expect(component.value).toBeDefined();
        expect(component.generateCalendar).toHaveBeenCalled();
    }));
});
