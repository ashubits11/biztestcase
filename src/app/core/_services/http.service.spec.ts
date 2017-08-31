import { BaseRequestOptions, ConnectionBackend, Http, Response, ResponseOptions, XHRBackend } from '@angular/http';
import { Router } from '@angular/router';

import { TestBed, async, inject } from '@angular/core/testing';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { Observable } from 'rxjs/Observable';

import { AuthHttp } from 'ng2-adal/services';

import { StrategyOptions } from './strategy-options.service';
import { LoaderService } from '../loader/loader.service';
import { ErrorHandlingService } from '../error-handling/error-handling.service';
import { environment } from '../../../environments/environment';
import { SecretService } from './secret.service';

import { HttpService } from './http.service';

describe('HttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        HttpService,
        ErrorHandlingService,
        {
          provide: LoaderService,
          useClass: MockLoaderService
        },
        MockBackend,
        BaseRequestOptions,
        {
          provide: AuthHttp,
          useFactory: (backend: XHRBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [
            MockBackend,
            BaseRequestOptions
          ]
        },
        {
          provide: Router,
          useClass: MockRouter
        },
        {
          provide: SecretService,
          useClass: MockSecretService
        }
      ]
    });
  });

  let httpService;
  let http;
  let errorHandlingService;
  let loaderService;
  let backend;
  let secretService;
  beforeEach(inject([HttpService, AuthHttp, ErrorHandlingService,
    LoaderService, MockBackend, SecretService], (_httpService: HttpService, _http: AuthHttp, _errorHandlingService: ErrorHandlingService, _loaderService: LoaderService, _backend: MockBackend, _secretService: SecretService) => {
    httpService = _httpService;
    http = _http;
    errorHandlingService = _errorHandlingService;
    loaderService = _loaderService;
    backend = _backend;
    secretService = _secretService;
  }));

  it('should be created', () => {
    expect(httpService).toBeTruthy();
  });

  it('should expect httpService to return an Observable', () => {
    console.log(httpService.get('abc'));
    expect(httpService.get('abc')).toEqual(jasmine.any(Observable));
  });

  it('should expect httpService.get to call showLoader with no params', () => {
    spyOn(httpService, 'showLoader');
    httpService.get();
    expect(httpService.showLoader).toHaveBeenCalledWith();
  });

  it('should expect httpService.get to set header', () => {
    spyOn(httpService, 'detectIE').and.returnValue(true);
    httpService.get();
  });

  it('should expect httpService.get to call onSuccess and also call onEnd', async(() => {
    const dummyResponseData = {
      data: {
        content: 'Some dummy get content'
      }
    };
    let lastConnection;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        lastConnection = connection;
        connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(dummyResponseData)})));
      }
    );
    spyOn(httpService, 'showLoader');
    const onSuccessSpy = spyOn(httpService, 'onSuccess');
    const onEndSpy = spyOn(httpService, 'onEnd');
    httpService.get(httpService.getFullUrl('dummy-url'), 'dummy-headers').subscribe(
      res => expect(onSuccessSpy.calls.first().args[0].json()).toEqual({ data: { content: 'Some dummy get content' }})
    );
    expect(httpService.showLoader).toHaveBeenCalledWith();
    expect(onEndSpy.calls.any()).toBe(true);
    expect(lastConnection.request.url).toMatch(/[a-zA-Z0-9]+\/dummy-url/);
  }));

  it('should expect httpService.get to catch the error', async(() => {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockError(new Error('Some error occured in the server'));
      }
    );
    spyOn(httpService, 'onCatch').and.returnValue(Observable.throw('The error was caught like this.'));
    spyOn(httpService, 'onError');
    spyOn(httpService, 'onEnd');
    expect(() => httpService.get().subscribe()).toThrow('The error was caught like this.');
    expect(httpService.onError).toHaveBeenCalledWith('The error was caught like this.');
    expect(httpService.onEnd).toHaveBeenCalledWith();
  }));

  it('should expect httpService.post to call onSuccess and onEnd', async(() => {
    const dummyResponseData = {
      data: {
        content: 'Some dummy post content'
      }
    };
    let lastConnection;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        lastConnection = connection;
        connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(dummyResponseData)})));
      }
    );
    spyOn(httpService, 'showLoader');
    const consoleSpy = spyOn(console, 'log');
    const loaderServiceHideSpy = spyOn(loaderService, 'hide');
    const onSuccessSpy = spyOn(httpService, 'onSuccess');
    const onEndSpy = spyOn(httpService, 'onEnd');
    httpService.post(httpService.getFullUrl('dummy-url'), 'dummy-headers').subscribe(
      response => expect(onSuccessSpy.calls.first().args[0].json()).toEqual({data: {content: 'Some dummy post content'}})
    );
    expect(httpService.showLoader).toHaveBeenCalledWith();
    expect(onEndSpy.calls.any()).toBe(true);
    expect(lastConnection.request.url).toMatch(/[a-zA-Z0-9]+\/dummy-url/);
  }));

  it('should expect httpService.post to handle error response', async(() => {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockError(new Error('Some error occured in the server'));
      }
    );
    spyOn(httpService, 'onCatch').and.returnValue(Observable.throw('The error was caught like this.'));
    spyOn(httpService, 'onError');
    spyOn(httpService, 'onEnd');
    expect(() => httpService.post().subscribe()).toThrow('The error was caught like this.');
    expect(httpService.onError).toHaveBeenCalledWith('The error was caught like this.');
    expect(httpService.onEnd).toHaveBeenCalledWith();
  }));

  it('should expect httpService.put to call onSuccess and onEnd', async(() => {
    const dummyResponseData = {
      data: {
        content: 'Some dummy put content'
      }
    };
    let lastConnection;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        lastConnection = connection;
        connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(dummyResponseData)})));
      }
    );
     spyOn(httpService, 'showLoader');
    const onSuccessSpy = spyOn(httpService, 'onSuccess');
    const onEndSpy = spyOn(httpService, 'onEnd');
    httpService.put(httpService.getFullUrl('dummy-url')).subscribe(
      response => expect(onSuccessSpy.calls.first().args[0].json()).toEqual({data: {content: 'Some dummy put content'}})
    );
    expect(httpService.showLoader).toHaveBeenCalledWith();
    expect(onEndSpy.calls.any()).toBe(true);
    expect(lastConnection.request.url).toMatch(/[a-zA-Z0-9]+\/dummy-url/);
  }));

  it('should expect httpService.put to handle error response', async(() => {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockError(new Error('Some error occured in the server'));
      }
    );
    spyOn(httpService, 'onCatch').and.returnValue(Observable.throw('The error was caught like this.'));
    spyOn(httpService, 'onError');
    spyOn(httpService, 'onEnd');
    expect(() => httpService.put().subscribe()).toThrow('The error was caught like this.');
    expect(httpService.onError).toHaveBeenCalledWith('The error was caught like this.');
    expect(httpService.onEnd).toHaveBeenCalledWith();
  }));

  it('should expect httpService.delete to call onSuccess and onEnd', () => {
    const dummyResponseData = {
      data: {
        content: 'Some dummy delete content'
      }
    };
    let lastConnection;
    backend.connections.subscribe(
      (connection: MockConnection) => {
        lastConnection = connection;
        connection.mockRespond(new Response(new ResponseOptions({body: JSON.stringify(dummyResponseData)})));
      }
    );
    spyOn(httpService, 'showLoader');
    const onSuccessSpy = spyOn(httpService, 'onSuccess');
    const onEndSpy = spyOn(httpService, 'onEnd');
    httpService.delete(httpService.getFullUrl('dummy-url')).subscribe(
      response =>  expect(onSuccessSpy.calls.first().args[0].json()).toEqual({data: {content: 'Some dummy delete content'}})
    );
    expect(httpService.showLoader).toHaveBeenCalledWith();
    expect(onEndSpy.calls.any()).toBe(true);
    expect(lastConnection.request.url).toMatch(/[a-zA-Z0-9]+\/dummy-url/);
  });

  it('should expect httpService.delete to handle error response', async(() => {
    backend.connections.subscribe(
      (connection: MockConnection) => {
        connection.mockError(new Error('Some error occured in the server'));
      }
    );
    spyOn(httpService, 'onCatch').and.returnValue(Observable.throw('The error was caught like this.'));
    spyOn(httpService, 'onError');
    spyOn(httpService, 'onEnd');
    expect(() => httpService.delete().subscribe()).toThrow('The error was caught like this.');
    expect(httpService.onError).toHaveBeenCalledWith('The error was caught like this.');
    expect(httpService.onEnd).toHaveBeenCalledWith();
  }));

  it('should expect detectIE to return false when initially called with default userAgent settings', () => {
    expect(httpService.detectIE()).toBe(false);
  });

  it('should expect detectIE to return 10 for MSIE', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      get: () => { return 'Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0)'; }
    });
    expect(httpService.detectIE()).toBe(10);
  });

  it('should expect detectIE to return 11 for Trident', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      get: () => { return 'Mozilla/5.0 (Windows NT 6.3; Trident/7.0; rv:11.0) like Gecko'; }
    });
    expect(httpService.detectIE()).toBe(11);
  });

  it('should expect detectIS to return 12 for version 12 and above', () => {
    Object.defineProperty(window.navigator, 'userAgent', {
      get: () => { return 'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2171.71 Safari/537.36 Edge/12.0'; }
    });
    expect(httpService.detectIE()).toBe(12);

    Object.defineProperty(window.navigator, 'userAgent', {
      get: () => { return 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2486.0 Safari/537.36 Edge/13.10586'; }
    });
    expect(httpService.detectIE()).toBe(13);
  });

  it('should expect requestOptions to return null', () => {
    expect(httpService.requestOptions()).toBe(null);
  });

  it('should expect reuquesrequestOptions to set options to Headers', () => {
    expect(httpService.requestOptions({})).toBe(null);
  });

  it('should expect requestOptions not to set new Headers', () => {
    expect(httpService.requestOptions({headers: 'Dummy Header Value'}))
    .toBe(null);
  });

  it('should expect getFull url to return "dummy-api-url/additional-url-string"', () => {
    httpService.apiUrl = 'dummy-api-url/';
    expect(httpService.getFullUrl('additional-url-string'))
    .toBe('dummy-api-url/additional-url-string');
  });

  it('should expect onCatch to return an Observable', () => {
    expect(httpService.onCatch({message: 'Some dummy error'})).toEqual(jasmine.any(Observable));
  });

  it('should expect onCatch to call ErroHandlingService.show with error message', () => {
    const errorHandlingShowSpy = spyOn(errorHandlingService, 'show');
    const dummyErrorMessage = {
      message: 'Something Went Wrong!!',
      heading: 'Server Error',
      permission: false
    };
    httpService.onCatch({'not status': 101});
    expect(errorHandlingShowSpy.calls.first().args[0]).toEqual(dummyErrorMessage);
  });

  it('should expect onCatch not to call ErrorHandlingService.show', () => {
    const errorHandlingShowSpy = spyOn(errorHandlingService, 'show');
    httpService.onCatch({status: 101});
    expect(errorHandlingShowSpy.calls.any()).toBe(false);
  });

  it('should expect onSuccess to log on the console "Request successful"', () => {
    spyOn(console, 'log');
    httpService.onSuccess();
    expect(console.log).toHaveBeenCalledWith('Request successful');
  });

  it('should expect onError to return undefined', () => {
    expect(httpService.onError({message: 'Some dummy error message'})).toBe(undefined);
  });

  it('should expect onError to handle 403 error code', () => {
    const handle403dummy = {
      status: 403
    };
    const mockMessageResponse = {
      message: 'You don\'t have permissions to access this Application.',
      heading: 'Insufficient Permissions',
      permission: true,
      back: true
    };
    const errorHandlingShowSpy = spyOn(errorHandlingService, 'show');
    httpService.onError(handle403dummy);
    expect(errorHandlingShowSpy.calls.first().args[0])
    .toEqual(mockMessageResponse);
  });

  it('should expect onError to handle other errors that are not 403', () => {
    const handle403dummy = {
      status: 101
    };
    const mockMessageResponse = {
      message: 'Something Went Wrong!!',
      heading: 'Server Error',
      permission: false
    };
    const errorHandlingShowSpy = spyOn(errorHandlingService, 'show');
    httpService.onError(handle403dummy);
    expect(errorHandlingShowSpy.calls.first().args[0])
    .toEqual(mockMessageResponse);
  });

  it('should expect onEnd to return undefined', () => {
    expect(httpService.onEnd()).toBe(undefined);
  });

  it('should expect onEnd to call hideLoader', () => {
    spyOn(httpService, 'hideLoader');
    httpService.onEnd();
    expect(httpService.hideLoader).toHaveBeenCalledWith();
  });

  it('should expect hideLoader to return undefined', () => {
    expect(httpService.hideLoader()).toBe(undefined);
  });

  it('should expect hideLoader to call loaderService.hide', () => {
    spyOn(loaderService, 'hide');
    httpService.hideLoader();
    expect(loaderService.hide).toHaveBeenCalledWith();
  });

});

class MockLoaderService {
  show() {}
  hide() {}
}
class MockHttp {
  get() {}
}
class MockRouter {}
class MockErrorHandlingService {
  show(message: any) {}
}
class MockSecretService {
  get samApiUrl(): any {
    return'dummy-sam-api-url/';
  }
}
