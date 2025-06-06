export interface Role {
  name: 'SuperAdmin';
  routePermissions: [];
  actionPermissions: []
}

export interface UserWorkspace {
  id: number;
  name: string;
}

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  currentWorkspaceId?: number;
  userWorkspaces: UserWorkspace[];
  role: Role;
}
