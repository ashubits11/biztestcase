export interface Application {
  id: string;
  name: string;
  isActive: boolean;
  version: string;
  description: string;
  contextTypes: Array<string>;
  ldapEnabled: boolean;
  display: string;
}
export class Application {
  id: string;
  name: string;
  isActive: boolean;
  version: string;
  description: string;
  contextTypes: Array<string>;
  ldapEnabled: boolean;
  display: string;
  constructor(obj?: Application) {
    this.id = obj && obj.id ? obj.id : 'default';
    this.name = obj && obj.name ? obj.name : 'default';
    this.isActive = obj && obj.isActive ? true : false;
    this.version = obj && obj.version ? obj.version : '0.0.0';
    this.description = obj && obj.description ? obj.description : 'No Description';
    this.contextTypes = obj && obj.contextTypes ? obj.contextTypes : [];
    this.ldapEnabled = obj && obj.ldapEnabled ? true : false;
    this.display = obj && obj.display ? obj.display : 'NO Name';
  }
}
