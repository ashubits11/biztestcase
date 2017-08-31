import { Injectable } from '@angular/core';

// Application specific configuration
@Injectable()
export class SecretService {

  private _secrets: any;
  private _samApiUrl: string;
  private _samEngineUrl: string;

  activityType: any = {
    VIEW_APP: 'ViewApp',
    UPDATE_APP: 'UpdateApp',
    UPDATE_USER_GROUP: 'UpdateUserGroup',
    VIEW_USER_GROUP: 'ViewUserGroup',
    VIEW_USER: 'ViewUser',
    ADD_USER: 'AddUser',
    DELETE_USER: 'DeleteUser'
  };

  public get samApiUrl(): any {
    return this._samApiUrl;
  }

  public set samApiUrl(samApiUrl: any) {
    this._samApiUrl = samApiUrl;
  }

  public get samEngineUrl(): any {
    return this._samEngineUrl;
  }

  public set samEngineUrl(samEngineUrl: any) {
    this._samEngineUrl = samEngineUrl;
  }

  public get secrets(): any {
    return this._secrets;
  }

  public set secrets(secrets: any) {

    const endpoints: any = {};
    const samEngineUrl = this.getSettings(secrets, 'SAM_ENGINE_ENDPOINT');
    const samEngineAzureClientId = this.getSettings(secrets, 'SAM_ENGINE_AZURE_CLIENTID');
    const samAdminApiUrl = this.getSettings(secrets, 'SAM_ADMIN_API_ENDPOINT');
    const samAdminApiAzureClientId = this.getSettings(secrets, 'SAM_ADMIN_API_AZURE_CLIENTID');
    const samAdminUiAzureClientId = this.getSettings(secrets, 'SAM_ADMIN_UI_AZURE_CLIENTID');

    endpoints[samEngineUrl] = samEngineAzureClientId;
    endpoints[samAdminApiUrl] = samAdminApiAzureClientId;

    this.samApiUrl = samAdminApiUrl;
    this.samEngineUrl = samEngineUrl;

    this._secrets = {
      clientId: samAdminUiAzureClientId,
      endpoints: endpoints,
      extraQueryParameter: 'domain_hint=ttx.com',
      cacheLocation: 'localStorage'
    };
  }


  getSettings(configs: any, key?: string | Array<string>, defaultValue?: any): any {

    if (!key || (Array.isArray(key) && !key[0])) {
      return configs;
    }

    if (!Array.isArray(key)) {
      key = key.split('.');
    }

    const result = key.reduce((acc: any, current: string) => acc && acc[current], configs);

    if (result === undefined) {
      console.log(`key not found: ${key}`);
    }

    return result;
  }

  public get uiActivites(): Array<string> {
    return Object.keys(this.activityType).map(key => this.activityType[key]);
  }
}
