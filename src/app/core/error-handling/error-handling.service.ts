import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { ErrorHandlingState } from './error-handling';
@Injectable()
export class ErrorHandlingService {
    private errorHandlingSubject = new Subject<ErrorHandlingState>();
    public errorHandlingState = this.errorHandlingSubject.asObservable();
    constructor() { }
    show(message: any) {
        this.errorHandlingSubject.next(<ErrorHandlingState>{ show: true, message: message.message, heading: message.heading, permission: message.permission, back: message.back || false });
    }
    hide() {
        this.errorHandlingSubject.next(<ErrorHandlingState>{ show: false});
    }
}
