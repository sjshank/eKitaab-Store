import { useMemo } from "react";

const useInitialValues = (init: any) => {
  const initialValues: any = useMemo(
    () => ({
      ...init,
    }),
    []
  );
  return initialValues;
};

export default useInitialValues;
