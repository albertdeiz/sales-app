export interface Role {
  name: 'SuperAdmin';
  routePermissions: [];
  actionPermissions: []
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}
