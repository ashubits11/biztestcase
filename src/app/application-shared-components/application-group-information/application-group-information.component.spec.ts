import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { ApplicationGroupInformationComponent } from './application-group-information.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { SharedModule } from '../../shared/shared.module';
import * as ng2tooltip from 'ng2-tooltip';
import { ApplicationGroup } from '../application-shared-components.module';
import { Observable } from 'rxjs/Observable';
import { ApplicationGroupService } from '../../application-group-detail/application-group.service';
import { MockBackend } from '@angular/http/testing';
import { ApplicationGroupContextKeyPipe } from '../filters/application-group-context-key-pipe';

import { Permission } from '../application-shared-components.module';
import { HttpService } from '../../core/_services/http.service';
import { LoaderService } from '../../core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from '../../core/error-handling/error-handling.service';
import { SecretService } from '../../core/_services/secret.service';
import { AuthorizationService } from '../../core/_services/authorization.service';

fdescribe('ApplicationGroupInformationComponent', () => {
    let component: ApplicationGroupInformationComponent;
    let fixture: ComponentFixture<ApplicationGroupInformationComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FormsModule, RouterTestingModule, SharedModule, ng2tooltip.TooltipModule],
            declarations: [ApplicationGroupInformationComponent, ApplicationGroupContextKeyPipe],
            providers: [
                ApplicationGroupService,
                MockBackend,
                BaseRequestOptions,
                HttpService,
                LoaderService,
                AdalService,
                AuthHttp,
                ErrorHandlingService,
                SecretService,
                AuthorizationService,
                {
                    provide: Http,
                    useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
                    deps: [MockBackend, BaseRequestOptions]
                }
            ]
        })
            .compileComponents();
    }));
    let mockApplicationGroupService;

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationGroupInformationComponent);
        component = fixture.componentInstance;
        component.applicationGroup = new ApplicationGroup();
        component.permission = new Permission();
        component.applicationGroupName = '';
        component.policyGroupName = '';
        mockApplicationGroupService = fixture.debugElement.injector.get(ApplicationGroupService);

        fixture.detectChanges();
    });

    xit('should be created', () => {
        expect(component).toBeTruthy();
    });

    xit('should navigate back', () => {
        spyOn(component['router'], 'navigate');
        component.goBack();
        expect(component['router'].navigate).toHaveBeenCalled();
    });

    xit('should enable edit', () => {
        component.edit = false;
        component.enableEdit();
        expect(component.edit).toBe(true);
    });

    // it('should updateApplicationGroup', () => {
    //     spyOn(component, 'enableEdit');
    //     component.updateApplicationGroup(false);

    //     expect(component.enableEdit).toHaveBeenCalled();
    // });


    // it('should fetch application details on init', () => {
    //     spyOn(component['applicationService'], 'getApplicationDetail').and.callFake(() => {
    //         return {
    //             subscribe: () => { }
    //         };
    //     });
    //     component.ngOnInit();
    //     expect(component['applicationService'].getApplicationDetail).toHaveBeenCalled();
    // });
});

