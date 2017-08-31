import { Component, ComponentRef, OnInit, Input, ViewChild, AfterViewInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { ApplicationGroup } from '../application-group-detail-container/application-group-detail-container.interface';
import { SearchOptions } from '../application-search/application-search.interface';
import { NoResultFound } from '../no-result-found/no-result-found.interface';
import { DatePickerOptions, DateModel } from '../../common/common';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';
import { UserModal, USER_MODAL_TYPE } from './add-user-modal.interface';
import { ISlimScrollOptions } from 'ng2-slimscroll';
import { Observable } from 'rxjs/Observable';
import { UserService } from '../../application-user-detail-listing/user.service';
import { Subject } from 'rxjs/Subject';
import * as _ from 'lodash';
import { ConfirmModal } from '../confirm-modal/confirm-modal.interface';
import * as moment from 'moment-timezone';
@Component({
  selector: 'app-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.css']
})
export class AddUserModalComponent implements AfterViewInit, OnInit, OnDestroy {
  @Input() userModal: UserModal;
  @Output() onUpdate: EventEmitter<any> = new EventEmitter();

  selectedGroups: Array<string>;
  opts: ISlimScrollOptions;
  startDate: DateModel;
  endDate: DateModel;
  startDateOptions: DatePickerOptions;
  endDateOptions: DatePickerOptions;
  users: Array<any>;
  selectedUsers: Array<any>;
  searchOptions: SearchOptions;
  searchLoader: boolean;
  searchText: string;
  noResultFound: NoResultFound;
  form: FormGroup;
  searchSubject: Subject<any> = new Subject();
  errorMessage: Array<string>;
  @ViewChild('modal') modal: ModalComponent;
  open: boolean;
  confirmUser: boolean;
  confirmModal: ConfirmModal;
  constructor(fb: FormBuilder, private userService: UserService) {
    this.searchOptions = new SearchOptions({ placeholder: 'Enter Name or User ID...' });
    this.noResultFound = new NoResultFound();
    this.selectedUsers = new Array();
    this.selectedGroups = [];
    this.users = [];
    this.open = false;
    this.confirmUser = false;
    this.form = fb.group({
      'startDate': [this.startDate, Validators.required],
      'endDate': [this.endDate]
    });
    this.startDateOptions = new DatePickerOptions({ placeHolder: 'Start Date', initialDate: new Date(), minDate: new Date() });
    this.endDateOptions = new DatePickerOptions({ placeHolder: 'End Date', minDate: new Date() });
  }


  ngOnInit() {
  }

  onCloseForm(value: boolean, formData: any) {
    this.errorMessage = [];
    if (!value) {
      return this.onUpdate.emit({ value: false, users: this.selectedUsers, dates: formData });
    } else {
      const getFormData: any = this.form.getRawValue();
      const currentDate: any = moment().endOf('day').tz('America/Chicago');
      let startDate: any;
      let endDate: any;
      if (getFormData.startDate) {
        startDate = moment(getFormData.startDate.formatted).endOf('day').tz('America/Chicago');
      }
      if (getFormData.endDate) {
        endDate = moment(getFormData.endDate.formatted).endOf('day').tz('America/Chicago');
      }

      if (this.dateCompare(currentDate, startDate)) {
        this.errorMessage.push('Start Date cannot be less than Today');
      }

      if (this.dateCompare(startDate, endDate)) {
        this.errorMessage.push('Start Date cannot be greater than End Date');
      }

      if (this.dateCompare(currentDate, endDate)) {
        this.errorMessage.push('End Date cannot be less than Today');
      }

      if (this.errorMessage.length === 0) {
        this.errorMessage = null;
        this.modal.close();
        const confirmStartDate: any = getFormData.startDate ? getFormData.startDate.formatted : null;
        const confirmEndDate: any = getFormData.endDate ? getFormData.endDate.formatted : null;
        setTimeout(() => {
          this.confirmModal = new ConfirmModal({
            title: 'Confirm', label: 'Are you sure you want to add selected users?',
            buttonName: 'Add Users', groups: this.userModal.groups,
            users: this.selectedUsers.map(user => `${user.lastName} ${user.firstName}`),
            dateRange: {
              start: this.changeTimeZone(confirmStartDate),
              end: this.changeTimeZone(confirmEndDate)
            }
          });
          this.confirmUser = value;
        }, 500);
      }
    }
  }

  dateCompare(momentA: any, momentB: any) {
    if (momentA > momentB) {
      return true;
    } else { return false; };
  }

  changeTimeZone(givenDate: any) {
    let tempDate: any;
    if (givenDate) {
      tempDate = moment(givenDate).endOf('day').tz('America/Chicago');
      return tempDate._i;
    } else {
      return null;
    }
  }

  confirmUserModal(event: any) {
    this.confirmUser = false;
    if (event) {
      return this.onUpdate.emit({ value: false, users: this.selectedUsers, dates: this.form.getRawValue() });
    } else {
      this.onUpdate.emit(undefined);
    }
  }

  onSearchUpdate(event: string) {
    this.searchText = event;
    if (this.searchText !== '') {
      this.searchLoader = true;
      this.userService.searchUser(event).subscribe((res: any) => {
        this.selectedUsers.forEach((user: any) => {
          const index = _.findIndex(res, (element: any) => { return element.id === user.id; });
          if (index >= 0) {
            res[index].selected = true;
          }
        });
        this.users = res;
        this.searchLoader = false;
      }, (err: any) => {
        this.searchLoader = false;
        this.users = [];
      });
    }
  }

  clearUsers() {
    this.searchLoader = false;
    this.users = [];
    this.searchText = '';
    this.searchSubject.next('clear text');
  }

  addUserToList(user: any) {
    user.selected = !user.selected;
    if (user.selected) {
      this.selectedUsers.push(_.cloneDeep(user));
    } else {
      const index = _.findIndex(this.selectedUsers, (element: any) => { return element.id === user.id; });
      this.selectedUsers.splice(index, 1);
    }
  }

  deleteUser(user: any) {
    const index = _.findIndex(this.selectedUsers, (element: any) => { return element.id === user.id; });
    return this.selectedUsers.splice(index, 1) || false;
  }

  ngAfterViewInit() {
    if (!this.open) {
      this.modal.open();
      this.open = true;
    }
  }

  dismissModal(event: any) {
    this.onUpdate.emit(undefined);
  }

  ngOnDestroy() {
    this.searchSubject.unsubscribe();
  }

}
