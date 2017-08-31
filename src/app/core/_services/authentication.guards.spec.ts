// Angular
import {
    Router,
    CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    Resolve
} from '@angular/router';

// Testing
import {
    TestBed,
    inject,
    async
} from '@angular/core/testing';

// RxJs
import { Observable } from 'rxjs/Observable';

// SAM
import { AuthenticationGuard } from './authentication.guard';
import { AuthenticationService } from './authentication.service';

describe('AuthenticationGuard', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                AuthenticationGuard,
                {
                    provide: AuthenticationService,
                    useClass: MockAuthenticationService
                }
            ]
        });
    });

    let authenticationGuard;
    let authenticationService;
    beforeEach(inject([AuthenticationGuard, AuthenticationService], (_authenticationGuard: AuthenticationGuard, _authenticationService: AuthenticationService) => {
        authenticationGuard = _authenticationGuard;
        authenticationService = _authenticationService;
    }));

    it('should expect AuthGuard to be defined', () => {
        expect(authenticationGuard).toBeTruthy();
    });

    it('should expect canActivate() to return true if user is authenticated', () => {
        spyOn(authenticationService, 'isAuthenticated').and.returnValue(Observable.of(true));
        authenticationGuard.canActivate().subscribe(
            res => expect(res).toBe(true)
        );
    });

    it('should expect canActivate() to return false if user is ot authenticated', () => {
        spyOn(authenticationService, 'isAuthenticated').and.returnValue(Observable.of(false));
        spyOn(authenticationService, 'login');
        authenticationGuard.canActivate().subscribe(
            res => {
                expect(authenticationService.login).toHaveBeenCalledWith();
                expect(res).toBe(false);
            }
        );
    });

    it('should expect canActivate() to handle error', () => {
        spyOn(authenticationService, 'isAuthenticated').and.returnValue(Observable.throw(new Error()));
        authenticationGuard.canActivate().subscribe(
            res => {
                expect(res).toBe(false);
            }
        );
    });

});

class MockAuthenticationService {
    isAuthenticated() {}
    login() {}
}
