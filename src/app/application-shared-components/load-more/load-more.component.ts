import {
    Component,
    OnInit,
    Input,
    OnDestroy,
    Output,
    EventEmitter,
    NgZone,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    HostListener,
    Inject
} from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { LoadMoreOptions, Dimensions } from './load-more.interface';

@Component({
  selector: 'app-load-more',
  templateUrl: './load-more.component.html'
})
export class LoadMoreComponent implements OnInit, OnDestroy {

    @Input() loadMoreOptions: LoadMoreOptions;
    @Output() updateRowsSize: EventEmitter<number>  = new EventEmitter<number>();
    dimensions: Dimensions;
    itemPerPage: number;
    totalItemShown: number;
    customScrollHeight: any;
    customScrollTop: any;

    constructor(private ngZone: NgZone, @Inject(DOCUMENT) private document: any) {
      this.totalItemShown = 0;
        this.dimensions = new Dimensions({width: 0, height: 0});
         window.onresize = (e) => {
            // ngZone.run will help to run change detection
             let hasWindowResized: Boolean;
             hasWindowResized = false;
                this.ngZone.run(() => {
                    if ( this.dimensions && (this.dimensions.height < window.innerHeight)) {
                        this.dimensions.changeDimensions({width: window.innerWidth, height: window.innerHeight});
                        this.calculateOnReSize();
                        hasWindowResized = true;
                    }
                });
                return hasWindowResized;
            };
    }

    @HostListener('window:scroll', [])
    onWindowScroll() {
        this.customScrollHeight = Math.max(this.document.body.scrollHeight, this.document.documentElement.scrollHeight);
        this.customScrollTop = Math.max(this.document.body.scrollTop, this.document.documentElement.scrollTop);
        if (this.customScrollTop + window.outerHeight > this.customScrollHeight - 100) {
            this.increaseSize();
        }
    }

    ngOnInit() {
        setTimeout(() => {
                this.ngZone.run(() => {
                this.dimensions.changeDimensions({width: window.innerWidth, height: window.innerHeight});
                this.itemPerPage = this.calulateItemsPerPage();
                this.updateScreen(this.itemPerPage * 2); // initial for showing scroll bar
            });
        });
    }

    calulateItemsPerPage() {
         return Math.floor(this.dimensions.height / this.loadMoreOptions.heightOfContainer) * this.loadMoreOptions.columnsPerRow;
    }


    calculateOnReSize() {
        const size = this.calulateItemsPerPage();
        const diff = size - this.itemPerPage;
        if (diff > 0) {
            this.itemPerPage = size;
            this.updateScreen(diff);
        }
    }

    updateScreen(size: number) {
        this.totalItemShown += size;
        this.updateRowsSize.emit(this.totalItemShown);
    }

    increaseSize() {
        this.updateScreen(this.itemPerPage);
    }

    ngOnDestroy() {
        delete this.dimensions;
        delete this.loadMoreOptions;
        delete this.totalItemShown;
    }
}
