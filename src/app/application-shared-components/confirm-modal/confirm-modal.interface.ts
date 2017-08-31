export interface IConfirmModal {
  title: string;
  label?: string;
  buttonName?: string;
  groups?: any;
  users?: any;
  dateRange?: any;
}

export class ConfirmModal {
  label?: string;
  buttonName?: string;
  title: string;
  groups?: any;
  users?: any;
  dateRange?: any;
  constructor(obj?: IConfirmModal) {
    this.title = obj && obj.title ? obj.title : 'No Result Found';
    this.label = obj && obj.label ? obj.label : 'No Result Found';
    this.buttonName = obj && obj.buttonName ? obj.buttonName : 'Please check spelling or try different keywords';
    this.groups = obj && obj.groups ? obj.groups : null;
    this.users = obj && obj.users ? obj.users : null;
    this.dateRange = obj && obj.dateRange ? obj.dateRange : null;
  }
}
