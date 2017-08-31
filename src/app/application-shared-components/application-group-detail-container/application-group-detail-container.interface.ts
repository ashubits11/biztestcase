
export interface IApplicationGroup {

  context: any;
  contextKeys?: Array<string>;
  userGroup: string;
  description: string;
  policyGroupName: string;
  selected?: boolean;
  name?: string;
}

export class ApplicationGroup {
  context: any;
  contextKeys?: Array<string>;
  userGroup: string;
  description: string;
  policyGroupName: string;
  selected: boolean;
  name?: string;
  constructor(obj?: IApplicationGroup) {
    this.context = obj && obj.context ? obj.context : {};
    this.contextKeys = obj && obj.contextKeys ? obj.contextKeys : [  ];
    this.userGroup = obj && obj.userGroup ? obj.userGroup : '';
    this.description = obj && obj.description ? obj.description : '';
    this.policyGroupName = obj && obj.policyGroupName ? obj.policyGroupName : '';
    this.selected = obj && obj.selected ? obj.selected : false;
    this.name = obj && obj.name ? obj.name : '';
  }
}
