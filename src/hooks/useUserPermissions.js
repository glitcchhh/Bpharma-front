import { useCallback, useState } from "react";
import { useAuth } from "../contexts/AuthProvider";
import { userPermissions } from "../constants/Constants";
import { useLocation } from "react-router-dom";

export const useUserPermission = () => {
  const { user } = useAuth();
  const userType = user.user;
  const { pathname: path } = useLocation();

  const getUserPermissions = useCallback(
    ({ permissionType = "", currentPath = null || path }) => {
      const permission = userPermissions
        ?.find((_) => _.user == userType)
        ?.permissions?.find((perm) => perm.path == currentPath);

      if (permission?.hasOwnProperty("path")) {
        return permission[currentPath][permissionType];
      }

      return false;
    },
    []
  );

  return {
    getUserPermissions,
  };
};
