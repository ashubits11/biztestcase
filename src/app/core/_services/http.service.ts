import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthHttp } from 'ng2-adal/services';
import { Router } from '@angular/router';
import 'rxjs/Rx';
import {
    Http,
    RequestOptions,
    RequestOptionsArgs,
    Response,
    Request,
    Headers,
    XHRBackend
} from '@angular/http';
import { StrategyOptions } from './strategy-options.service';
import { LoaderService } from '../loader/loader.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { environment } from '../../../environments/environment';
import { SecretService } from './secret.service';
@Injectable()
export class HttpService {
    apiUrl: string;

    constructor(
        private loaderService: LoaderService,
        private http: AuthHttp,
        private router: Router,
        private errorHandlingService: ErrorHandlingService,
        private secretService: SecretService
    ) {
        this.apiUrl = this.secretService.samApiUrl;
    }

    get(url: string, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        const requestHeader: RequestOptionsArgs = {};
        if (this.detectIE()) {
            requestHeader.headers = new Headers();
            requestHeader.headers.set('Pragma', 'no-cache');
            requestHeader.headers.set('Expires', '-1');
            requestHeader.headers.set('Cache-Control', 'no-cache');
        }
        return this.http.get(this.getFullUrl(url), requestHeader)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }

    post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        return this.http.post(this.getFullUrl(url), body)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });
    }
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        return this.http.put(this.getFullUrl(url), body)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });

    }

    delete(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {
        this.showLoader();
        const tmpOptions: RequestOptionsArgs = {
            body: body
        };
        return this.http.delete(this.getFullUrl(url), tmpOptions)
            .catch(this.onCatch)
            .do((res: Response) => {
                this.onSuccess(res);
            }, (error: any) => {
                this.onError(error);
            })
            .finally(() => {
                this.onEnd();
            });

    }

    private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new StrategyOptions();
        }

        if (options.headers == null) {
            options.headers = new Headers();
        }
        return null;
    }

    private getFullUrl(url: string): string {
        return this.apiUrl + url;
    }

    private onCatch(error: any, caught: Observable<any>): Observable<any> {
        const err = error || error.json();
        if (err && !err.status) {
            this.errorHandlingService.show({
                message: 'Something Went Wrong!!',
                heading: 'Server Error',
                permission: false
            });
        }
        return Observable.throw(error);
    }

    private onSuccess(res: Response): void {
        console.log('Request successful');
    }

    private onError(res: Response): void {
        const err = res || res.json();
        if (err && err.status) {
            const message: any = {};
            if (err.status === 400) {
                message.message = JSON.parse(err._body).message;
                message.heading = 'Validation Error';
                message.permission = true;
            }else if (err.status === 403) {
                message.message = `You don't have permissions to access this Application.`;
                message.heading = 'Insufficient Permissions';
                message.permission = true;
                message.back = true;
            } else {
                message.message = 'Something Went Wrong!!';
                message.heading = 'Server Error';
                message.permission = false;
            }
            this.errorHandlingService.show(message);
        }
    }

    private onEnd(): void {
        this.hideLoader();
    }

    private showLoader(): void {
        this.loaderService.show();
    }

    private hideLoader(): void {
        this.loaderService.hide();
    }

    detectIE() {
        const ua: any = window.navigator.userAgent;

        // Test values; Uncomment to check result …

        // IE 10
        // ua = 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)';

        // IE 11
        // ua = 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko';

        // IE 12 / Spartan
        // ua = 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0';

        // Edge (IE 12+)
        // ua = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586';

        const msie = ua.indexOf('MSIE ');
        if (msie > 0) {
            // IE 10 or older => return version number
            return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
        }

        const trident = ua.indexOf('Trident/');
        if (trident > 0) {
            // IE 11 => return version number
            const rv = ua.indexOf('rv:');
            return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
        }

        const edge = ua.indexOf('Edge/');
        if (edge > 0) {
            // Edge (IE 12+) => return version number
            return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
        }

        // other browser
        return false;
    }
}
