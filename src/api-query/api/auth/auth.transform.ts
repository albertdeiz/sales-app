/* eslint-disable @typescript-eslint/no-explicit-any */

export const transformUser = (user: any): any => {
  return {
    firstName: user.firstName || '',
    lastName: user.lastName || '',
    email: user.email || '',
    role: {
      name: user.role?.name || 'User',
      routePermissions: user.role?.routePermissions || [],
      actionPermissions: user.role?.actionPermissions || []
    }
  };
};
