import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../core/_services/http.service';
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Application } from '../application-shared-components/application-shared-components.module';
import { ApplicationGroup } from '../application-shared-components/application-shared-components.module';
import { ApplicationGroupUser } from '../application-shared-components/application-shared-components.module';


@Injectable()
export class ApplicationGroupUserService {

 // private instance variable to hold base url
  private url = '/applications';

  // Resolve HTTP using the constructor
  constructor(private http: HttpService) { }

  /**
   * Get All Application Group Users
   */
  getApplicationGroupAllUsers(applicationName: string, groupName: string, policyGroupName?: string): Observable<ApplicationGroupUser[]> {
    return this.http.get(`${this.getUrl(applicationName, groupName, policyGroupName || null)}users`)
      .map((res: Response) => res.json())
       .catch(this.handleError);
  }

  /**
   * Get Application Group User
   */
  getApplicationGroupUser(applicationName: string, groupName: string, userId: string, policyGroupName?: string ): Observable<ApplicationGroupUser> {
    return this.http.get(`${this.getUrl(applicationName, groupName, policyGroupName || null)}users/${userId}`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }
  /**
  * Update Application Group User
  */
  updateApplicationGroupUser(applicationName: string, groupName: string, body: ApplicationGroupUser, policyGroupName?: string): Observable<ApplicationGroupUser> {
    const bodyString = JSON.stringify(body); // Stringify payload
    const headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON
    const options = new RequestOptions({ headers: headers }); // Create a request option
    return this.http.put(`${this.getUrl(applicationName, groupName, policyGroupName || null )}users/${body.id}`, body, options) // ...using put request
      .map((res: Response) => res.json()) // ...and calling .json() on the response to return data
       .catch(this.handleError);
  }

   /**
   *  get activites of group
   * @param applicationName
   * @param groupName
   * @param policyGroupName
   */
  getApplicationGroupActivities(applicationName: string, groupName: string, policyGroupName?: string): Observable<string[]> {
    return this.http.get(`${this.getUrl(applicationName, groupName, policyGroupName)}activities`)
      .map((res: Response) => res.json())
      .catch(this.handleError);
  }

   getUrl(applicationName: string, applicationGroupName: string, policyGroupName: string): string {
    let actUrl = `${this.url}/${applicationName}`;
    if (policyGroupName) {
      actUrl = `${actUrl}/policyGroups/${policyGroupName}/localUserGroups/${applicationGroupName}/`;
    } else {
      actUrl = `${actUrl}/localUserGroups/${applicationGroupName}/`;
    }
     return actUrl;
  }

  /**
   * Handle any errors from the API
   */
  private handleError(err: any) {
    let errMessage: string;
    if (err instanceof Response) {
      const body = err.json() || '';
      const error = body.error || JSON.stringify(body);
      errMessage = `${err.status} - ${err.statusText} || ''} ${error}`;
    } else {
      errMessage = err.message ? err.message : err.toString();
    }
    return Observable.throw(errMessage);
  }
}
