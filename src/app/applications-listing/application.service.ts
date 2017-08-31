import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../core/_services/http.service';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Application } from '../application-shared-components/application-shared-components.module';
import { ApplicationGroup } from '../application-shared-components/application-shared-components.module';
@Injectable()
export class ApplicationService {

  // private instance variable to hold base url
  private url = '/applications';

  // Resolve HTTP using the constructor
  constructor(private http: HttpService) { }
  /**
   * Grab All Applications
   */
  getAllApplications(): Observable<Application[]> {
    return this.http.get(this.url).map((res) => res.json());
  }
}
