import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { ApplicationDropdown, SelectedContext } from './application-detail-dropdown.interface';
import { AppilicationDetailDropdownComponent } from './appilication-detail-dropdown.component';
import { ContextFilterPipe } from '../filters/context-filter.pipe';
import { CommonSortFilterPipe } from '../filters/common-sort-filter.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { Subject } from 'rxjs/Subject';


describe('AppilicationDetailDropdownComponent', () => {
    let component: AppilicationDetailDropdownComponent;
    let fixture: ComponentFixture<AppilicationDetailDropdownComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [AppilicationDetailDropdownComponent, ContextFilterPipe, CommonSortFilterPipe],
            providers: [
                MockBackend,
                BaseRequestOptions,
                {
                    provide: Http,
                    useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(AppilicationDetailDropdownComponent);
        component = fixture.componentInstance;
        component.selectedValue = {};
        component.contextSubject = new Subject();
        fixture.detectChanges();
    });

    beforeEach(inject([MockBackend], (mockBackend) => {
        mockBackend.connections.subscribe(conn => {
            conn.mockRespond(new Response(new ResponseOptions({ body: JSON.stringify(['data']) })));
        });
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should bind all contexts', () => {
        const dummyContexts = { value: true, contextTypes: ['dummy'], data: { dummy: 'dummy value' } };
        component.contextSubject.next(dummyContexts);
        component.init();
        expect(component.contexts).toBe(dummyContexts.data);

    });

    it('should change selected items', () => {
        component.selectedValue = { 'facility': '*' };
        component.changeSelected({ 'facility': 'abc' }, 'facility', 1);
        expect(component.selectedValue['facility'] === 'abc').toBe(false);
    });

    it('should set facility to * if index is 0', () => {
        spyOn(component.dropdownUpdate, 'emit');
        component.selectedValue = { 'facility': 'abc' };
        component.changeSelected({ 'facility': '' }, 'facility', 0);
        expect(component.selectedValue['facility'] === '*').toBe(false);
        expect(component.dropdownUpdate.emit).toHaveBeenCalledWith(component.selectedValue);
    });
});
