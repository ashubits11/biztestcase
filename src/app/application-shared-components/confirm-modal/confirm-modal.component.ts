import { Component, ComponentRef, OnInit, Input, ViewChild, EventEmitter, Output, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { ConfirmModal } from './confirm-modal.interface';
@Component({
  selector: 'app-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css']
})
export class ConfirmModalComponent implements AfterViewInit {
  @ViewChild('modal') modal: ModalComponent;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  @Input() confirmModal: ConfirmModal;
  constructor() {
  }
  ngAfterViewInit() {
    this.modal.open();
  }
  dismissModal(event: boolean) {
    this.onUpdate.emit(event);
  }
}
