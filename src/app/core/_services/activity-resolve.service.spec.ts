// Angular
import {
    Router,
    ActivatedRoute
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
import { ActivityResolveService } from './activity-resolve.service';
import { SecretService } from './secret.service';
import { AuthorizationService } from './authorization.service';
import { AuthenticationService } from './authentication.service';

describe('Service: ActivityResolveService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ActivityResolveService,
                {
                    provide: SecretService,
                    useClass: MockSecretService
                },
                {
                    provide: AuthorizationService,
                    useClass: MockAuthorizationService
                },
                {
                    provide: AuthenticationService,
                    useClass: MockAuthenticationService
                },
                {
                    provide: Router,
                    useClass: MockRouter
                },
                {
                    provide: ActivatedRoute,
                    useClass: MockRoute
                }
            ]
        });
    });

    let activityResolveService;
    let authorizationService;
    let route;
    beforeEach(inject([ActivityResolveService, AuthorizationService, ActivatedRoute], (_activityResolveService: ActivityResolveService, _authorizationService: AuthorizationService, _route: ActivatedRoute) => {
        activityResolveService = _activityResolveService;
        authorizationService = _authorizationService;
        route = _route;
    }));

    it('should expect ActivityResolveService to be defined', () => {
        expect(activityResolveService).toBeTruthy();
    });

    it('should expect resolve to handle an error response', () => {
        spyOn(authorizationService, 'callSamEngine').and.returnValue(Observable.throw(new Error()));
        activityResolveService.resolve(route).subscribe(
            error => expect(error).toBeNull()
        );
    });

    it('should expect resolve to return "Some fields"', async(() => {
        const dummyResponseFields = ['Some fields'];
        spyOn(authorizationService, 'callSamEngine').and.returnValue(Observable.of(dummyResponseFields));
        activityResolveService.resolve(route).subscribe(
            fields => {
                expect(fields).toEqual(dummyResponseFields);
            }
        );
    }));
});

class MockSecretService {
    mockActivitesObject = {};
    get uiActivites() {
        return this.mockActivitesObject;
    }
}
class MockAuthorizationService {
    callSamEngine(user: string, activities: Array<string>, app: string) { }
}
class MockAuthenticationService {
    mockUserInternal = {
        userName: 'johndoe'
    };
    get user(): any {
        return this.mockUserInternal;
    }
}
class MockRouter { }
class MockRoute {
    params: any = Observable.of({ id: 'dummy-id' });
    parent: Object = {
        params: Observable.of({ id: 'dummy-id' })
    };
}
