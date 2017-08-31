import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Http, Response, RequestOptions, Request, ConnectionBackend } from '@angular/http';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {

    constructor(private auth: AuthenticationService) { };
    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        return this.auth.isAuthenticated().map((res) => {
            if (res) {
                 return true;
            } else {
                this.auth.login();
                return false;
            }
        }).take(1).catch((err: any) => {
            return Observable.of(false);
        });
    }
}
