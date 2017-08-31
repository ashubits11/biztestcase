export interface ISearchOptions {
  placeholder?: string;
}
export class SearchOptions {
  placeholder?: string;
  constructor(obj?: ISearchOptions) {
    this.placeholder = obj && obj.placeholder ? obj.placeholder : 'Search';
  }
}
