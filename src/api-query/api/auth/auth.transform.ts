/* eslint-disable @typescript-eslint/no-explicit-any */
import type { User } from '@/interfaces/user.interfaces';

export const transformUser = (user: any): User => {
  return {
    id: user.id,
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    currentWorkspaceId: user.currentWorkspaceId,
    userWorkspaces: (user.userWorkspaces ?? []).map((workspace: any) => ({
      id: workspace.workspace?.id || -1,
      name: workspace.workspace?.name || '',
    })),
    role: {
      name: user.role?.name || 'User',
      routePermissions: user.role?.routePermissions || [],
      actionPermissions: user.role?.actionPermissions || [],
    },
  };
};
