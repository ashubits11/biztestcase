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
export class ApplicationGroupService {

  // private instance variable to hold base url
  private url = '/applications';

  // Resolve HTTP using the constructor
  constructor(private http: HttpService) { }

  /**
   * Get Detail Of Application
   */
  getApplicationDetail(applicationName: string): Observable<Application> {
    return this.http.get(`${this.url}/${applicationName}`)
      .map((res: Response) => res.json());
  }

  /**
  *  Get all group of application
  * @param applicationName
  */
  getApplicationGroups(applicationName: string): Observable<ApplicationGroup> {
    return this.http.get(`${this.url}/${applicationName}/allUserGroups`)
      .map((res: Response) => res.json());
  }


  /**
   * Get Application  All Contexts
   */
  getApplicationContext(applicationName: string): Observable<any> {
     return this.http.get(`${this.url}/${applicationName}/contexts`)
      .map((res: Response) => res.json());
  }

  /**
   * Update Application Detail
   */
  updateApplication(body: Application): Observable<Application> {
    return this.http.put(`${this.url}/${body.name}`, body) // ...using put request
      .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
  }

  /**
   * Get all detail of application group
   * @param applicationName
   * @param applicationGroupName
   * @param policyGroupName
   */
  getApplicationGroupsDetail(applicationName: string, applicationGroupName: string, policyGroupName?: string): Observable<ApplicationGroup> {
    const url = this.getUrl(applicationName, applicationGroupName, policyGroupName || null);
    return this.http.get(`${this.getUrl(applicationName, applicationGroupName, policyGroupName || null)}`)
      .map((res: Response) => res.json());
  }

  /**
   * update application group
   * @param applicationGroup
   * @param applicationName
   */
  updateApplicationGroup(applicationGroup: ApplicationGroup, applicationName: string, applicationGroupName: string, policyGroupName?: string): Observable<ApplicationGroup> {
    return this.http.put(`${this.getUrl(applicationName, applicationGroupName, policyGroupName || null)}`, applicationGroup) // ...using put request
      .map((res: Response) => res.json()); // ...and calling .json() on the response to return data
  }

  /**
   * generate url for calling to server
   * @param applicationName
   * @param applicationGroupName
   * @param policyGroupName
   */

  getUrl(applicationName: string, applicationGroupName: string, policyGroupName: string): string {
    let actUrl = `${this.url}/${applicationName}`;
    if (policyGroupName) {
      actUrl = `${actUrl}/policyGroups/${policyGroupName}/localUserGroups/${applicationGroupName}/`;
    } else {
      actUrl = `${actUrl}/localUserGroups/${applicationGroupName}/`;
    }
    return actUrl;
  }
}
