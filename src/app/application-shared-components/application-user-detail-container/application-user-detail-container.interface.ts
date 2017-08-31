export interface IApplicationGroupUser {
  from: string;
  id: string;
  name: string;
  to: string;
  selected: boolean;
}
export class ApplicationGroupUser {
  from: string;
  id: string;
  name: string;
  to: string;
  selected: boolean;
  constructor(obj?: IApplicationGroupUser) {
    this.from = obj && obj.from ? obj.from : 'default';
    this.id = obj && obj.id ? obj.id : 'default';
    this.name = obj && obj.name ? obj.name : 'default';
    this.to = obj && obj.to ? obj.to : 'default';
    this.selected = obj && obj.selected ? obj.selected : false;
  }
}

export interface IPageDetail {
  applicationName: string;
  userGroupName: string;
  policyGroupName: string;
}


export class PageDetail {
  applicationName: string;
  userGroupName: string;
  policyGroupName: string;
  constructor(obj?: IPageDetail) {
    this.applicationName = obj && obj.applicationName ? obj.applicationName : 'default';
    this.userGroupName = obj && obj.userGroupName ? obj.userGroupName : 'default';
    this.policyGroupName = obj && obj.policyGroupName ? obj.policyGroupName : 'default';
  }
}
