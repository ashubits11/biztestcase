import { async, fakeAsync, tick, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationCenterService } from '../notification-center.service';
import { NotificationCenterComponent } from './notification-center.component';
import { Notification } from './notification-center.interface';

describe('NotificationCenterComponent', () => {
  let component: NotificationCenterComponent;
  let fixture: ComponentFixture<NotificationCenterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        NotificationCenterComponent
      ],
      providers: [
        NotificationCenterService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should clear notifications', () => {
    component.clear();
    expect(component.notifications.length).toBe(0);
  });

  it('should remove notification', () => {
    const notification = new Notification({
      type: 'success',
      delay: 10,
      message: 'notification message',
      dismissible: true
    });

    component.notifications = [notification];

    component.removeNotification(notification);
    expect(component.notifications.length).toBe(0);
  });

  it('should add notifications on init', fakeAsync(() => {
    const notification = new Notification({
      type: 'success',
      delay: 100,
      message: 'notification message',
      dismissible: true
    });

    component.notifications = [];
    component.ngOnInit();
    component['notificationCenter'].emitter.emit(notification);

    tick(90);
    expect(component.notifications.length).toBe(2);

    tick(150);
    expect(component.notifications.length).toBe(0);
  }));
});
