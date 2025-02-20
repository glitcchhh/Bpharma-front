import { useCallback } from "react";
import { drawerData } from "../constants/Constants";

export const useAppBarTitle = () => {
  const getAppBarTitle = useCallback(
    ({ path }) => {
      const data = drawerData
        .flatMap((item) =>
          item.children
            ? item.children.map((child) => ({ ...child, parent: item }))
            : item
        )
        .find((item) => item.path === path || item.parent?.path === path);

      return data?.parent ? { ...data.parent, ...data } : data;
    },
    [drawerData]
  );

  return {
    getAppBarTitle,
  };
};
