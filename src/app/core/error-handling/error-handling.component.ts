import { Component, ComponentRef, OnInit, Input, ViewChild, EventEmitter, Output, AfterViewInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ErrorHandlingService } from './error-handling.service';
import { Subscription } from 'rxjs/Subscription';
import { ErrorHandlingState } from './error-handling';
@Component({
    selector: 'app-error-handling',
    templateUrl: './error-handling.component.html',
    styleUrls: ['./error-handling.component.css']
})
export class ErrorHandlingComponent implements AfterViewInit, OnDestroy {
    @ViewChild('errorModal') errorModal: ModalComponent;
    show = false;
    message: any;
    subscription: Subscription;
    state: ErrorHandlingState;
    constructor(
        private router: Router,
        private errorHandlingService: ErrorHandlingService
    ) {
        this.loadSubscriber();
        this.state = null;
    }

    loadSubscriber() {
         this.subscription = this.errorHandlingService.errorHandlingState
            .subscribe((state: ErrorHandlingState) => {
                     if (state.show && this.show === false) {
                        this.show = true;
                        this.state = state;
                        this.message = state;
                        if (!this.errorModal.visible) {
                            this.errorModal.open();
                        }
                }
            });
    }
    dismissModal(event: boolean) {
        this.show = false;
        if ( this.state.back) {
             this.router.navigate(['/applications']);
        }
    }

    ngAfterViewInit() {
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
