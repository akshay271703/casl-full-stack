export interface IPermissionResponse {
  action: string;
  subject: string;
  fields?: any;
  conditions?: any;
}

export interface ILoginResponse {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  group: string;
  permissions: IPermissionResponse[];
}
