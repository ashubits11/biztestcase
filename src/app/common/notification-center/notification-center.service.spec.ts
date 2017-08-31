import { TestBed, inject } from '@angular/core/testing';

import { NotificationCenterService } from './notification-center.service';

describe('NotificationCenterService', () => {
  let service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificationCenterService]
    });
  });

  beforeEach(inject([NotificationCenterService], (_service: NotificationCenterService) => {
    service = _service;
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show success message', () => {
    spyOn(service.emitter, 'emit');
    service.success();

    expect(service.emitter.emit).toHaveBeenCalled();
  });

  it('should show info message', () => {
    spyOn(service.emitter, 'emit');
    service.info();

    expect(service.emitter.emit).toHaveBeenCalled();
  });

  it('should show warning message', () => {
    spyOn(service.emitter, 'emit');
    service.warning();

    expect(service.emitter.emit).toHaveBeenCalled();
  });

  it('should show danger message', () => {
    spyOn(service.emitter, 'emit');
    service.danger();

    expect(service.emitter.emit).toHaveBeenCalled();
  });
});
