import { TestBed, inject } from '@angular/core/testing';

import { LoaderService } from './loader.service';
import { Subject } from 'rxjs/Subject';
import { LoaderState } from './loader';

describe('Loader service', () => {
    let service;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoaderService]
        });
    });

    beforeEach(inject([LoaderService], (_service: LoaderService) => {
        service = _service;
    }));

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    // it('should show loader', () => {
    //     service.show();
    //     expect(service.showLoader).toEqual(true);
    // });

    // it('should hide loader', () => {
    //     service.hide();
    //     expect(service.showLoader).toEqual(false);
    // });

});
