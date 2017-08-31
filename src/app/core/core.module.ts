import { NgModule, APP_INITIALIZER, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { XHRBackend, RequestOptions } from '@angular/http';
import { LoaderService } from './loader/loader.service';
import { LoaderComponent } from './loader/loader.component';
import { SecretService } from './_services/secret.service';
import { AuthenticationService } from './_services/authentication.service';
import { AuthenticationGuard } from './_services/authentication.guard';
import { AdalService } from 'ng2-adal/core';
import { AuthorizationService } from './_services/authorization.service';
import { StrategyOptions } from './_services/strategy-options.service';
import { AuthHttp } from 'ng2-adal/services';
import { HttpService } from './_services/http.service';
export { Permission } from './_services/permission.interface';
import { PageNotFoundComponent } from './404-not-found/404-not-found.component';
import * as angular2loaderscss from 'angular2-loaders-css';
import { CoreRoutingModule } from './core-routing.module';
import { ActivityResolveService } from './_services/activity-resolve.service';
import { ErrorHandlingComponent } from './error-handling/error-handling.component';
import { ErrorHandlingService } from './error-handling/error-handling.service';
import { Ng2Bs3ModalModule } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ConfigService } from './_services/config.service';
import { GlobalExceptionHandler } from './global-exception-handler';


export function configurationServiceFactory(configService: ConfigService): Function {
  return () => { return configService.init(); };
}

@NgModule({
    imports: [
        CommonModule,
        CoreRoutingModule,
        angular2loaderscss.LoadersCssModule,
        Ng2Bs3ModalModule
    ],
    exports: [
        LoaderComponent,
        ErrorHandlingComponent,
        PageNotFoundComponent
    ],
    declarations: [
        LoaderComponent,
        ErrorHandlingComponent,
        PageNotFoundComponent
    ],
    providers: [
        LoaderService,
        ErrorHandlingService,
        SecretService,
        AuthenticationService,
        AuthenticationGuard,
        AdalService,
        AuthorizationService,
        AuthHttp,
        StrategyOptions,
        HttpService,
        ActivityResolveService,
        ConfigService,
        {
            provide: APP_INITIALIZER,
            useFactory: configurationServiceFactory,
            deps: [ConfigService],
            multi: true
        },
        GlobalExceptionHandler,
        { provide: ErrorHandler, useClass: GlobalExceptionHandler, deps: [ErrorHandlingService] }

    ]
})

export class CoreModule { }
