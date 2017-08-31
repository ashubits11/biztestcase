import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ApplicationDropdown, SelectedContext } from './application-detail-dropdown.interface';
import { Subject } from 'rxjs/Subject';
@Component({
  selector: 'app-appilication-detail-dropdown',
  templateUrl: './appilication-detail-dropdown.component.html',
  styleUrls: ['./appilication-detail-dropdown.component.css']
})
export class AppilicationDetailDropdownComponent implements OnInit, OnDestroy {

  @Input() contextSubject: Subject<any>;
  @Output() dropdownUpdate = new EventEmitter();
  selectedValue: any = {};
  contextSubscription: any;
  contexts: any;
  contextTypes: Array<string>;
  constructor() {
    this.selectedValue = {};
  }
  ngOnInit() {
    this.init();
  }
  init() {
    this.contextSubject.subscribe((event: any) => {
      if (event.value) {
        this.contextTypes = event.contextTypes;
        this.contextTypes.forEach(element => {
          this.selectedValue[`${element}`] = `All ${element}`;
        });
        this.contexts = event.data;
      }
    });
  }

  changeSelected(item: any, context: string, index: number) {
    this.selectedValue[`${context}`] = item;
    this.selectedValue = _.cloneDeep(this.selectedValue);
    this.dropdownUpdate.emit(this.selectedValue);
  }

  ngOnDestroy() {
    delete this.contextSubscription;
    this.contextSubject.unsubscribe();
  }

}
