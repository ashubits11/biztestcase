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
export class UserService {

  // Resolve HTTP using the constructor
  constructor(private http: HttpService) { }
  /**
    * search users
    */
  searchUser(searchString: string): Observable<any> {
    return this.http.get(`/referenceData/users?q=${searchString}`)
      .map((res: Response) => res.json())
      .catch((error: any) => Observable.throw(error.json().error || 'Server error')); // ...errors if any
  }

  addUserToGroups(obj: any, applicationName: string): Observable<any> {
    return this.http.post(`/applications/${applicationName}/users`, obj) // ...using put request
      .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
  }

  removeUsersFromGroups(obj: any, applicationName: string) {
    return this.http.delete(`/applications/${applicationName}/users`, obj) // ...using put request
      .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
  }
}
