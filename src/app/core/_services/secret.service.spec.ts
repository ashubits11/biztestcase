import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions } from '@angular/http';
import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';
import { SecretService } from './secret.service';

describe('SecretService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SecretService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend: ConnectionBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  let secretService;
  beforeEach(inject([SecretService], (_secretService: SecretService) => {
    secretService = _secretService;
  }));

  it('should be created', () => {
    expect(secretService).toBeTruthy();
  });

  it('should expect samApiUrl to return undefined initially', () => {
    expect(secretService.samApiUrl).toBe(undefined);
  });

  it('should expect samApiUrl to set the samApiUrl to "dummy-sam-api-url"', () => {
    secretService.samApiUrl = 'dummy-sam-api-url';
    expect(secretService.samApiUrl).toBe('dummy-sam-api-url');
  });

  it('should expect samEngineUrl to return undefined initially', () => {
    expect(secretService.samEngineUrl).toBe(undefined);
  });

  it('should expect samEngineUrl to return "dummy-sam-engine-url"', () => {
    secretService.samEngineUrl = 'dummy-sam-engine-url';
    expect(secretService.samEngineUrl).toBe('dummy-sam-engine-url');
  });

  it('should expect secrets to return undefined initially', () => {
    expect(secretService.secrets).toBe(undefined);
  });

  it('should expect secrets to return the new secrets object', () => {
    const dummySecrets = {
      SAM_ENGINE_ENDPOINT: 'dummy-sam-engine-endpoint',
      SAM_ENGINE_AZURE_CLIENTID: 'dummy-sam-engine-azure-clientid',
      SAM_ADMIN_API_ENDPOINT: 'dummy-sam-admin-api-endpoint',
      SAM_ADMIN_API_AZURE_CLIENTID: 'dummy-sam-admin-api-azure-clientid',
      SAM_ADMIN_UI_AZURE_CLIENTID: 'dummy-sam-admin-ui-azure-clientid'
    };
    secretService.secrets = dummySecrets;
    expect(secretService.samApiUrl).toBe('dummy-sam-admin-api-endpoint');
    expect(secretService.samEngineUrl).toBe('dummy-sam-engine-endpoint');
    expect(secretService.secrets.clientId).toBe('dummy-sam-admin-ui-azure-clientid');
    expect(secretService.secrets.endpoints)
      .toEqual({ 'dummy-sam-engine-endpoint': 'dummy-sam-engine-azure-clientid', 'dummy-sam-admin-api-endpoint': 'dummy-sam-admin-api-azure-clientid' });
    expect(secretService.secrets.extraQueryParameter).toBe('domain_hint=ttx.com');
    expect(secretService.secrets.cacheLocation).toBe('localStorage');
  });

  it('should expect getSettings to return configs with key undefined', () => {
    const dummyConfigs = [];
    const dummyDefaultValue = 'dummy-default-value';
    expect(secretService.getSettings(dummyConfigs, undefined, dummyDefaultValue)).toEqual([]);
  });

  it('should expect getSettings to return configs with key as array', () => {
    const dummyConfigs = [];
    const dummyKeyString = [];
    expect(secretService.getSettings(dummyConfigs, dummyKeyString)).toEqual([]);
  });

  it('should expect getSettings to return a list of reduced input string', () => {
    const dummyConfigs = ['config 1', 'config 2'];
    const dummyDefaultValue = 'dummy-default-value';
    secretService.getSettings(dummyConfigs, 'dummy.key.string', dummyDefaultValue);

    const dummyStringArray = ['dummy1', 'dummy2'];
    secretService.getSettings(dummyConfigs, dummyStringArray, dummyDefaultValue);
  });

  it('should expect console to display "key not found: dummy-key-string"', () => {
    const dummyKeyString = 'dummy-key-string';
    const consoleSpy = spyOn(console, 'log');
    secretService.getSettings(undefined, dummyKeyString, undefined);
    expect(consoleSpy.calls.any()).toBe(true);
    expect(consoleSpy.calls.first().args[0]).toBe('key not found: dummy-key-string');
  });

  it('should expect uiActivities to return a list of activity values', () => {
    secretService.activityType = {
      DUMMY_KEY: 'dummyValue'
    };
    expect(secretService.uiActivites).toEqual(['dummyValue']);
  });

});
