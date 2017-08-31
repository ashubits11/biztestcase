import { Injectable, Inject } from '@angular/core';
import { Response, Http } from '@angular/http';
import { AdalService } from 'ng2-adal/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { OAuthData } from 'ng2-adal/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthenticationService {
    private userInternal: any;
    constructor(private adalService: AdalService) { }
    public configure(configOptions: adal.Config): void {
        this.adalService.init(configOptions);
    }

    public login(): void {
        this.adalService.login();
    }

    public logout(): void {
        this.adalService.logOut();
    }

    public initialize() {
      return new Promise<boolean>((resolve, reject) => {
        this.adalService.handleWindowCallback();
        this.adalService.getUser()
          .subscribe((value) => {
            const userInfo: OAuthData = this.adalService.userInfo;
            this.userInternal = userInfo;
            resolve(true);
        }, (error) => {
          reject(error);
        });
      });
    }

    public get user(): any {
        return this.userInternal;
    }

    public isAuthenticated(): Observable<boolean> {
      if (!this.userInternal) {
        return Observable.of(false);
      } else {
        return Observable.of(this.userInternal.isAuthenticated);
      }
    }
}
