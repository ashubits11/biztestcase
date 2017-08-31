import { async, fakeAsync, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';
import { LoaderComponent } from './loader.component';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('Loader component', () => {
    let component: LoaderComponent;
    let fixture: ComponentFixture<LoaderComponent>;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                LoaderComponent
            ],
            providers: [
                LoaderService
            ],
            schemas: [CUSTOM_ELEMENTS_SCHEMA]
        })
            .compileComponents();
    }));
    let loaderService;
    beforeEach(() => {
        fixture = TestBed.createComponent(LoaderComponent);
        component = fixture.componentInstance;
        loaderService = fixture.debugElement.injector.get(LoaderService);
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle loader on init', () => {

        component.counter = 0;
        component.show = true;
        component.ngOnInit();
         expect(component.show).toEqual(true);
        // loaderService.loaderState.subsribe(() => {
        //     expect(component.show).toEqual(false);
        // });
    });

});
