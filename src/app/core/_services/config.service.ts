import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';
import { AuthenticationService } from './authentication.service';
import { SecretService } from './secret.service';

@Injectable()
export class ConfigService {
    constructor(
        private http: Http,
        private secretService: SecretService,
        private auth: AuthenticationService
    ) { }

    init(endpoint: string = '/admin/ui/config/config.json'): Promise<any> {
        const ret = this.http.get(endpoint)
            .map((res: Response) => {
                return res.json();
            })
            .toPromise()
            .then((data: any) => {
                this.secretService.secrets = data;
                this.auth.configure(this.secretService.secrets);
                return this.auth.initialize();
            })
            .catch((err: any) => {
                return Promise.resolve(null);
            });
        return ret.then((x) => {
            console.log(x);
            if (!localStorage.getItem('headerColor')) {
                localStorage.setItem('headerColor', 'yellowApp');
            }
            console.log('---------------completed-------------');
        });
    }
}
