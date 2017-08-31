import { BaseRequestOptions, Headers } from '@angular/http';
export class StrategyOptions extends BaseRequestOptions {
    public headers: Headers;

    constructor () {
        super();
        this.headers.append('Content-Type', 'application/json');
    }
}
