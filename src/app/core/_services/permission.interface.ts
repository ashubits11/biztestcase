/**
- ViewApp – View a specific application only.
- UpdateApp – Update description of the application only.
- UpdateUserGroup – Update the user group description only (for the SAM Engine provided context/policyGroup for that application, which the specific user group belongs to).
- ViewUserGroup - View the user group only (for the SAM Engine provided context/policyGroup for that application, which the specific user group belongs to).
- ViewUser - View users in a user groups only(for the SAM Engine provided context/policyGroup for that application, which the specific user group belongs to).
- AddUser – Add users in a user groups only(for the SAM Engine provided context/policyGroup for that application, which the specific user group belongs to).
- DeleteUser- Delete users from user groups only(for the SAM Engine provided context/policyGroup for that application, which the specific user group belongs to).
*/
export interface IPermission {
    viewApp: boolean;
    updateApp: boolean;
    updateUserGroup: boolean;
    viewUserGroup: boolean;
    viewUser: boolean;
    addUser: boolean;
    deleteUser: boolean;
    havePermissions: boolean;
}

export class Permission {
    viewApp: boolean;
    updateApp: boolean;
    updateUserGroup: boolean;
    viewUserGroup: boolean;
    viewUser: boolean;
    addUser: boolean;
    deleteUser: boolean;
    havePermissions: boolean;
    constructor(obj?: IPermission) {
        this.viewApp = obj && obj.viewApp ? obj.viewApp : false;
        this.updateApp = obj && obj.updateApp ? obj.updateApp : false;
        this.updateUserGroup = obj && obj.updateUserGroup ? obj.updateUserGroup : false;
        this.viewUserGroup = obj && obj.viewUserGroup ? obj.viewUserGroup : false;
        this.viewUser = obj && obj.viewUser ? obj.viewUser : false;
        this.havePermissions = obj && obj.havePermissions ? obj.havePermissions : false;
        this.addUser = obj && obj.addUser ? obj.addUser : false;
        this.deleteUser = obj && obj.deleteUser ? obj.deleteUser : false;
    }
}
