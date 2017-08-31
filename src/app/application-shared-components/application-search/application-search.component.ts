import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';

import { SearchOptions } from './application-search.interface';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-application-search',
  templateUrl: './application-search.component.html',
  styleUrls: ['./application-search.component.css']
})
export class ApplicationSearchComponent implements OnInit, OnDestroy {
  @Input() options: SearchOptions;
  @Input() searchSubject: Subject<any> = new Subject();
  @Output() onSearchUpdate = new EventEmitter();
  searchText: string;
  constructor() {
    this.searchText = '';
  }

  ngOnInit() {
    if (this.options === null) {
      this.options = new SearchOptions();
    }
    this.searchSubject.subscribe( (event: any) => {
      this.searchText = '';
    });
  }

  searchChange(event: string) {
    debugger
    this.onSearchUpdate.emit(event);
  }

  ngOnDestroy() {
    delete this.options;
    delete this.searchText;
    this.searchSubject.unsubscribe();
  }
}
