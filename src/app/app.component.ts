
import { Component, AfterContentInit, NgZone, Renderer, ElementRef, ViewChild } from '@angular/core';
import { AuthenticationService } from './core/_services/authentication.service';
import { LoaderService } from './core/loader/loader.service';
import {
    Router,
    // import as RouterEvent to avoid confusion with the DOM Event
    Event as RouterEvent,
    NavigationStart,
    NavigationEnd,
    NavigationCancel,
    NavigationError
} from '@angular/router';
@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    auth: AuthenticationService;
    constructor(
        auth: AuthenticationService,
        private router: Router,
        private ngZone: NgZone,
        private renderer: Renderer,
        private loaderService: LoaderService
    ) {
        this.auth = auth;
        router.events.subscribe((event: RouterEvent) => {
            this._navigationInterceptor(event);
        });

    }

    // // Shows and hides the loading spinner during RouterEvent changes
    private _navigationInterceptor(event: RouterEvent): void {

        if (event instanceof NavigationStart) {

            // We wanna run this function outside of Angular's zone to
            // bypass change detection
            this.ngZone.runOutsideAngular(() => {

                // For simplicity we are going to turn opacity on / off
                // you could add/remove a class for more advanced styling
                // and enter/leave animation of the spinner
                this.loaderService.show();
            });
        }
        if (event instanceof NavigationEnd) {
            this._hideSpinner();
        }

        // Set loading state to false in both of the below events to
        // hide the spinner in case a request fails
        if (event instanceof NavigationCancel) {
            this._hideSpinner();
        }
        if (event instanceof NavigationError) {
            this._hideSpinner();
        }
    }

    private _hideSpinner(): void {

        // We wanna run this function outside of Angular's zone to
        // bypass change detection,
        this.ngZone.runOutsideAngular(() => {

            // For simplicity we are going to turn opacity on / off
            // you could add/remove a class for more advanced styling
            // and enter/leave animation of the spinner
            this.loaderService.hide();
        });
    }
}
