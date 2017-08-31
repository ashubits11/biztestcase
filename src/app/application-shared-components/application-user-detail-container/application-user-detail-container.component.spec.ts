import { async, inject, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpModule, Response, ResponseOptions, BaseRequestOptions, Http, ConnectionBackend } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ApplicationUserDetailContainerComponent } from './application-user-detail-container.component';
import { ApplicationGroupUser, PageDetail } from './application-user-detail-container.interface';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';
import { NoResultFoundComponent } from '../no-result-found/no-result-found.component';
import { ApplicationSearchComponent } from '../application-search/application-search.component';
import { DatePickerModule } from '../../common/common';
import { ApplicationsFilterPipe } from '../filters/applications-filter.pipe';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal';
import { USER_MODAL_TYPE, UserModal } from '../application-shared-components.module';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { SharedModule } from '../../shared/shared.module';
import { ApplicationGroupUserService } from '../../application-user-detail-listing/application-group-user.service';
import { MockBackend } from '@angular/http/testing';
import { HttpService } from '../../core/_services/http.service';
import { LoaderService } from '../../core/loader/loader.service';
import { AuthHttp, AdalService } from 'ng2-adal/services';
import { ErrorHandlingService } from '../../core/error-handling/error-handling.service';
import { SecretService } from '../../core/_services/secret.service';
import { AuthorizationService } from '../../core/_services/authorization.service';
import { ConfirmModal } from '../confirm-modal/confirm-modal.interface';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { Permission } from '../application-shared-components.module';

describe('ApplicationUserDetailContainerComponent', () => {
    let component: ApplicationUserDetailContainerComponent;
    let fixture: ComponentFixture<ApplicationUserDetailContainerComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                FormsModule,
                ReactiveFormsModule,
                DatePickerModule,
                Ng2Bs3ModalModule,
                RouterTestingModule,
            ],
            declarations: [
                ApplicationUserDetailContainerComponent,
                AddUserModalComponent,
                NoResultFoundComponent,
                ApplicationSearchComponent,
                ApplicationsFilterPipe,
                EditUserModalComponent,
            ],
            providers: [
                ApplicationGroupUserService,
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
            ],
            schemas: [NO_ERRORS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ApplicationUserDetailContainerComponent);
        component = fixture.componentInstance;
        component.applicationGroupUser = new ApplicationGroupUser();
        component.confirmModal = new ConfirmModal();
        component.pageDetail = new PageDetail();
        component.permission = new Permission();
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should emit application group user on select', () => {
        component.permission.deleteUser = true;
        spyOn(component.onUserSelect, 'emit');
        component.onSelected();

        expect(component.applicationGroupUser.selected).toBeDefined();
        expect(component.onUserSelect.emit).toHaveBeenCalled();
    });

    it('should open edit user modal', () => {
        component.editUser = true;
        component.editUserModalUpdate({value: false});
        expect(component.editUser).toEqual(false);
    });

    it('should open confirm remove', () => {
        component.confirmRemove();
        expect(component.removeUser).toEqual(true);

    });

/*    it('should remove user', () => {
        component.removeUser = true;
        component.removeModalUpdate(null);
        expect(component.removeUser).toEqual(false);

        spyOn(component['removeMe'], 'emit');
        component.removeModalUpdate(true);
        expect(component['removeMe']).toHaveBeenCalledWith(component.applicationGroupUser);
    });
    */
});
