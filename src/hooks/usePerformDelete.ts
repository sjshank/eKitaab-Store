import { FormContext, TFormContext } from "@/context/form-context";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const usePerformDelete = (actionName: () => Promise<any>, route: string) => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);

  useEffect(() => {
    if (formLegends.performDelete) {
      const deleteRecord = async () => {
        const response = await actionName();
        if (response) {
          router.push(`/catalog/${route}`);
          updateFormLegends({
            ...formLegends,
            isEdit: false,
            performDelete: false,
          });
        }
      };
      deleteRecord();
    }
  }, [formLegends.performDelete]);
};

export default usePerformDelete;
