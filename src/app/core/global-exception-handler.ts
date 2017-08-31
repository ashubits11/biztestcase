import { ErrorHandler, Injectable } from '@angular/core';
import { ErrorHandlingService } from './error-handling/error-handling.service';
import { environment } from '../../environments/environment';
@Injectable()
export class GlobalExceptionHandler extends ErrorHandler {

    constructor(private errorHandlingService: ErrorHandlingService) {
        // The true paramter tells Angular to rethrow exceptions, so operations like 'bootstrap' will result in an error
        // when an error happens. If we do not rethrow, bootstrap will always succeed.
        super(true);
    }
    handleError(error) {
        // send the error to the server
        this.errorHandlingService.show({
            message: environment.production ? 'Something Went Wrong!' : error,
            heading: 'Internal Exception',
            permission: false
        });
        // delegate to the default handler
       // super.handleError(error);
    }
}
