import { ApplicationGroupDetailContainerComponent } from '../application-group-detail-container/application-group-detail-container.component';
import { ApplicationGroup } from '../application-group-detail-container/application-group-detail-container.interface';
export let USER_MODAL_TYPE: any = {
    addUserModal: 'ADD_USER_MODAL',
    editUser: 'EDIT_USER_MODAL',
    addUserInGroup: 'ADD_USER_IN_GROUP'
};

export interface IUserModal {
    groups: Array<string>;
    modalType: string;
}

export class UserModal {
    groups: Array<string>;
    modalType: string;
    constructor( obj?: IUserModal) {
        this.groups = obj && obj.groups ? obj.groups : null;
        this.modalType = obj && obj.modalType ? obj.modalType : USER_MODAL_TYPE.addUserModal;
    }
}




