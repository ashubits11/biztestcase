
export interface IApplicationDropdown {
  key: string;
  selected: string;
  list: Array<string>;
}

export class ApplicationDropdown {
  key: string;
  selected: any;
  list: Array<string>;
  constructor(obj?: IApplicationDropdown) {
    this.key = obj && obj.key ? obj.key : 'default';
    this.selected = obj && obj.selected ? obj.selected : { value: 'default', key: 'default' };
    this.list = obj && obj.list ? obj.list : [];
  }
}
export interface ISelectedContext {
  contextAbbr: Array<string>;
  contextAbbrValue: Array<any>;
}
export class SelectedContext {
  contextAbbr: Array<string>;
  contextAbbrValue: Array<any>;
  constructor(obj?: ISelectedContext) {
    this.contextAbbr = obj && obj.contextAbbr ? obj.contextAbbr : [];
    this.contextAbbrValue = obj && obj.contextAbbrValue ? obj.contextAbbrValue : [];
  }
}
