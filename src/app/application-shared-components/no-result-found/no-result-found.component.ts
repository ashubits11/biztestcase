import { Component, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { NoResultFound } from './no-result-found.interface';

@Component({
  selector: 'app-no-result-found',
  templateUrl: './no-result-found.component.html',
  styleUrls: ['./no-result-found.component.css']
})
export class NoResultFoundComponent implements OnDestroy {

  @Input() noResultFound: NoResultFound;
  ngOnDestroy() {
    delete this.noResultFound;
  }

}
