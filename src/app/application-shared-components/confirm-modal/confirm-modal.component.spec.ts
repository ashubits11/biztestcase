import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfirmModal } from './confirm-modal.interface';

import { ConfirmModalComponent } from './confirm-modal.component';
import { ModalComponent, ModalHeaderComponent, ModalBodyComponent, ModalFooterComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

describe('RemoveUserModalComponent', () => {
    let component: ConfirmModalComponent;
    let fixture: ComponentFixture<ConfirmModalComponent>;
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                ConfirmModalComponent,
                ModalComponent,
                ModalHeaderComponent,
                ModalBodyComponent,
                ModalFooterComponent
            ]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ConfirmModalComponent);
        component = fixture.componentInstance;
        component.confirmModal = new ConfirmModal();
        component.confirmModal.groups = [];
        fixture.detectChanges();
    });

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it('should dismiss modal', () => {

        spyOn(component.onUpdate, 'emit');
        component.dismissModal(false);

        expect(component.onUpdate.emit).toHaveBeenCalledWith(false);
    });
});
