export interface IPermission {
  action: string;
  conditions: string;
  fields: string;
  id: string;
  subject: string;
}

export interface IGroupInfo {
  name: string;
  id: string;
}

export interface IPermissionList {
  name: string;
  id: string;
  permissions: IPermission[];
}