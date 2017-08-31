// Angular
import {
    NO_ERRORS_SCHEMA
} from '@angular/core';
import {
    Router
} from '@angular/router';

// Testing
import {
    TestBed,
    async,
    ComponentFixture,
    inject
} from '@angular/core/testing';

// RxJs
import { Observable } from 'rxjs/Observable';

// SAM
import { ErrorHandlingComponent } from './error-handling.component';
import { ErrorHandlingService } from './error-handling.service';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

describe('Component: ErrorHandlingComponent', () => {
    let fixture: ComponentFixture<ErrorHandlingComponent>;
    let component: ErrorHandlingComponent;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                ErrorHandlingComponent,
                ModalComponent
            ],
            providers: [
                {
                    provide: Router,
                    useClass: MockRouter
                },
                {
                    provide: ErrorHandlingService,
                    useClass: MockErrorHandlingService
                }
            ],
            schemas: [
                NO_ERRORS_SCHEMA
            ]
        })
            .compileComponents()
            .then(() => {
                fixture = TestBed.createComponent(ErrorHandlingComponent);
                component = fixture.componentInstance;
            });
    }));

    let errorHandlingService;
    let router;
    beforeEach(inject([ErrorHandlingService, Router], (_errorHandlingService: ErrorHandlingService, _router: Router) => {
        errorHandlingService = _errorHandlingService;
        router = _router;
    }));

    it('should expect ErrorHandlingComponent to be defined', () => {
        expect(component.show).toBe(false);
        expect(component).toBeTruthy();
    });

    it('should expect loadSubscriber to set component.show to true', async(() => {
        fixture.detectChanges();
        errorHandlingService.errorHandlingState = new Observable(observer => {
            observer.next({ show: true });
            observer.complete();
        });
        spyOn(component.errorModal, 'open');
        fixture.detectChanges();
        component.loadSubscriber();
        expect(component.show).toBe(true);
        expect(component.message).toEqual({ show: true });
        expect(component.errorModal.open).toHaveBeenCalledWith();
    }));

    it('should expect loadSubscriber to call errorModal.open', async(() => {
        errorHandlingService.errorHandlingState = new Observable(observer => {
            observer.next({ show: true });
            observer.complete();
        });
        spyOn(component.errorModal, 'open');
        component.errorModal.visible = true;
        fixture.detectChanges();
        component.loadSubscriber();
        expect(component.errorModal.open).not.toHaveBeenCalled();
    }));

    xit('should expect dismissModal to set component.show to false', () => {
        component.dismissModal(true);
        expect(component.show).toBe(false);
    });

    xit('should expect dismiss modal to call router with "/applications"', () => {
        const routerSpy = spyOn(router, 'navigate');
        component.dismissModal(true);
        expect(routerSpy.calls.first().args[0]).toEqual(['/applications']);
    });

});

class MockRouter {
    navigate(url) { return url; }
}
class MockErrorHandlingService {
    errorHandlingState = new Observable(observer => {
        observer.next({ show: false });
        observer.complete();
    });
}
