export interface Role {
  name: 'SuperAdmin';
  routePermissions: [];
  actionPermissions: []
}

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}
