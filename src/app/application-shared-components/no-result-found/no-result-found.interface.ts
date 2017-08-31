
export interface INoResultFound {
  label?: string;
  subLabel?: string;
}

export class NoResultFound {
  label?: string;
  subLabel?: string;
  subLabelAnchor?: string;
  constructor(obj?: INoResultFound) {
    this.label = obj && obj.label ? obj.label : 'No Result Found';
    this.subLabel = obj && obj.subLabel ? obj.subLabel : 'Please check spelling or try different keywords';
  }
}
