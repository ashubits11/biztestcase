// Angular

// Testing
import {
    TestBed,
    inject,
    async
} from '@angular/core/testing';

// RxJs
import { Observable } from 'rxjs/Observable';

// SAM
import { ErrorHandlingService } from './error-handling.service';

describe('ErrorHandlingService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ErrorHandlingService
            ]
        });
    });

    let errorHandlingService;
    beforeEach(inject([ErrorHandlingService], (_errorhandlingService: ErrorHandlingService) => {
        errorHandlingService  = _errorhandlingService;
    }));

    xit('should expect show to set error message', () => {
        const show$ = errorHandlingService.errorHandlingState;
        const dummyErrorMessage = {
            message: 'Dummy message',
            heading: 'Dummy heading',
            permission: false
        };
        show$.subscribe(
            nextErrorMessage => {expect(nextErrorMessage).toEqual({show: true, message: 'Dummy message', heading: 'Dummy heading', permission: false}); }
        );
        errorHandlingService.show(dummyErrorMessage);
    });

    it('should expect hide to set the next observable to "{show: false}"', async(() => {
        const hide$ = errorHandlingService.errorHandlingState;
        hide$.subscribe(
            nextState => expect(nextState).toEqual({show: false})
        );
        errorHandlingService.hide();
    }));
});
