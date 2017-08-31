import { Component, OnInit, EventEmitter, Output, Input, AfterViewChecked, ViewChild } from '@angular/core';
import { DatePickerOptions, DateModel } from '../../common/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UserModal, USER_MODAL_TYPE } from '../add-user-modal/add-user-modal.interface';
import * as _ from 'lodash';
import { ApplicationGroupUser } from '../application-user-detail-container/application-user-detail-container.interface';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['../add-user-modal/add-user-modal.component.css']
})
export class EditUserModalComponent implements OnInit, AfterViewChecked {
  @Input() applicationGroupUser: ApplicationGroupUser;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();
  form: FormGroup;
  startDate: DateModel;
  endDate: DateModel;
  startDateOptions: DatePickerOptions;
  endDateOptions: DatePickerOptions;
  errorMessage: Array<string>;
  @ViewChild('modal') modal: ModalComponent;
  open: boolean;
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {

    this.open = false;
    this.startDate = new DateModel();
    this.startDate.formatted = this.applicationGroupUser.from;
    this.endDate = new DateModel();
    this.endDate.formatted = this.applicationGroupUser.to;
    console.log(this.applicationGroupUser);
    this.form = this.fb.group({
      'startDate': [this.startDate, Validators.required],
      'endDate': [this.endDate, Validators.required]
    });
    this.startDateOptions = new DatePickerOptions({ placeHolder: 'Start Date' });
    this.endDateOptions = new DatePickerOptions({ placeHolder: 'End Date' });
  }

  ngAfterViewChecked() {
    if (!this.open) {
      this.modal.open();
      this.open = true;
    }
  }

  onCloseForm(value: boolean, formData: any) {
    this.errorMessage = [];
    const getFormData: any = this.form.getRawValue();
    const currentDate: any =  moment().endOf('day').tz('America/Chicago');
    let startDate: any;
    let endDate: any;
    if (getFormData.startDate.formatted) {
      startDate = moment(getFormData.startDate.formatted).endOf('day').tz('America/Chicago');
    }
    if (getFormData.endDate.formatted) {
      endDate = moment(getFormData.endDate.formatted).endOf('day').tz('America/Chicago');
    }
    if (this.dateCompare(startDate, endDate)) {
      this.errorMessage.push('Start Date cannot be greater than End Date');
    }

    if (this.dateCompare(currentDate, endDate)) {
        this.errorMessage.push('End Date cannot be less than Today');
    }

    if (this.errorMessage.length === 0) {
      this.errorMessage = null;
      this.onUpdate.emit({ value: true, dates: formData });
    }
  }

  dateCompare(momentA: any, momentB: any) {
    if (momentA > momentB) {
      return true;
    }else { return false; };
  }

  dateWithoutTime(theDate: any) {
    const time = theDate.getTime();
    return time - (time % 86400000);
  }

  dismissModal(event: any) {
    this.onUpdate.emit({ value: false });
  }

}
