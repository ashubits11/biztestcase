import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from './loader.service';
import { LoaderState } from './loader';
@Component({
    moduleId: module.id,
    selector: 'app-angular-loader',
    templateUrl: 'loader.component.html',
    styleUrls: ['loader.component.css']
})
export class LoaderComponent implements OnInit, OnDestroy {
    show: boolean;
    counter: number;
    private subscription: Subscription;
    constructor(
        private loaderService: LoaderService
    ) {
        this.show = false;
        this.counter = 0;
    }
    ngOnInit() {
        this.subscription = this.loaderService.loaderState
            .subscribe((state: LoaderState) => {
                state.show ? this.counter++ : this.counter--;
                if (this.counter === 0) {
                    this.show = false;
                } else {
                    this.show = true;
                }
            });
    }
    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
