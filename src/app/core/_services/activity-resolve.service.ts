import { Injectable } from '@angular/core';
import { Router, Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { SecretService } from './secret.service';
import { AuthorizationService } from './authorization.service';
import { AuthenticationService } from './authentication.service';
import 'rxjs/add/operator/first';
@Injectable()
export class ActivityResolveService implements Resolve<any> {
  constructor(
    private secretService: SecretService,
    private authorizationService: AuthorizationService,
    private auth: AuthenticationService,
    private router: Router
  ) {
  }
  resolve(route: ActivatedRouteSnapshot): Observable<any> | Promise<any> | any {
    return this.authorizationService.callSamEngine(this.auth.user.userName.substr(0, 6), this.secretService.uiActivites, route.params['id'] || route.parent.params['id']).map(fields => {
      return fields;
    }).first().catch((err: any) => {
      return Observable.of(null) ;
    });
  }
}
