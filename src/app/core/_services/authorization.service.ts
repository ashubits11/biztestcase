import { Injectable, Inject } from '@angular/core';
import { Response, Http, ConnectionBackend } from '@angular/http';
import { AuthHttp } from 'ng2-adal/services';
import { Subscriber } from 'rxjs/Subscriber';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/toPromise';
import { environment } from '../../../environments/environment';
import { ConfigService } from './config.service';
import * as _ from 'lodash';
import { Permission } from './permission.interface';
import { SecretService } from './secret.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
@Injectable()
export class AuthorizationService {

  samEngineUrl: string;
  constructor(private http: AuthHttp,
    private secretService: SecretService,
    private errorHandlingService: ErrorHandlingService) {
    this.samEngineUrl = this.secretService.samEngineUrl;
  }
  public callSamEngine(user: string, activities: Array<string>, app: string): Observable<any> {
    const encodedActivities = btoa(JSON.stringify({ activities, isDetailed: true }));
    const queryUrl = `${this.samEngineUrl}/${app}/${user}?data=${encodedActivities})`;
    return this.http.get(queryUrl)
      .map((res: Response) => {
        const response = res.json();
        // console.log(response);
        if (response && response.data.length === 0) {
          this.showError();
        }
        return res.json();
      })
      .catch((error: any) => {
        this.showError();
        return Observable.of(null);
      });
  }

  showError(error?: any) {
    this.errorHandlingService.show({
      message: `You don't have permissions to access this Application.`,
      heading: 'Insufficient Permissions',
      permission: true,
      back: true
    });
  }

  public getActivitesForPolicy(activites: any, policyName: string) {
    const index = _.findIndex(activites.data, (element: any) => { return element.name === policyName; });
    return index >= 0 ? activites.data[index] : null;
  }

  public getPermissionForActivity(policyActivity: any): Permission {
    const permission: Permission = new Permission();
    if (policyActivity && policyActivity.activitiesFound && policyActivity.activitiesFound.length >= 1) {
      permission.havePermissions = true;
      policyActivity.activitiesFound.forEach(element => {
        switch (element) {
          case this.secretService.activityType.VIEW_APP:
            permission.viewApp = true;
            break;
          case this.secretService.activityType.UPDATE_APP:
            permission.updateApp = true;
            break;
          case this.secretService.activityType.UPDATE_USER_GROUP:
            permission.updateUserGroup = true;
            break;
          case this.secretService.activityType.VIEW_USER_GROUP:
            permission.viewUserGroup = true;
            break;
          case this.secretService.activityType.VIEW_USER:
            permission.viewUser = true;
            break;
          case this.secretService.activityType.ADD_USER:
            permission.addUser = true;
            break;
          case this.secretService.activityType.DELETE_USER:
            permission.deleteUser = true;
            break;
        }
      });
    }
    return permission;
  }

  public getPermissionForApplication(activites: any): Permission {
    const permission = new Permission();
    if (activites && activites.data && activites.data.length >= 1) {
      activites.data.some((element: any) => {
        if (_.findIndex(element.activitiesFound,
          (activityName: any) => {
            return activityName === this.secretService.activityType.VIEW_APP;
          }
        ) >= 0) {
          permission.viewApp = true;
          return false;
        }
        return true;
      });

      activites.data.some((element: any) => {
        if (_.findIndex(element.activitiesFound,
          (activityName: any) => {
            return activityName === this.secretService.activityType.UPDATE_APP;
          }
        ) >= 0) {
          permission.updateApp = true;
          return false;
        }
        return true;
      });

      activites.data.some((element: any) => {
        if (_.findIndex(element.activitiesFound,
          (activityName: any) => {
            return activityName === this.secretService.activityType.ADD_USER;
          }
        ) >= 0) {
          permission.addUser = true;
          return false;
        }
        return true;
      });
    }
    return permission;
  }

  /**
 * Handle any errors from the API
 */
  private handleError(error: any) {
    let message = '';
    const err = error || error.json();
    if (err && err.status) {

      if (err.status === 403) {
        message = 'Not Authorized.';
      } else {
        message = 'Something went wrong!!';
      }
      this.errorHandlingService.show(message);
    }
    return Observable.throw(message);
  }
}


