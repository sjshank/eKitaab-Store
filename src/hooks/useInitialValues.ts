import { useMemo } from "react";

const useInitialValues = (init: any) => {
  const initialValues: any = useMemo(
    () => ({
      ...init,
    }),
    [init]
  );
  return initialValues;
};

export default useInitialValues;
