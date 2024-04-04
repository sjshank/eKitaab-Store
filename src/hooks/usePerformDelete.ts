import { AlertContext, TAlertContext } from "@/context/alert-context";
import { FormContext, TFormContext } from "@/context/form-context";
import { RECORD_DELETED_SUCCESS_MSG } from "@/utils/constants";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";

const usePerformDelete = (
  actionName: (args?: any[]) => Promise<Response>,
  route: string
) => {
  const router = useRouter();
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { updateAlert } = useContext<TAlertContext>(AlertContext);

  useEffect(() => {
    if (formLegends.performDelete) {
      const deleteRecord = async () => {
        const response = await actionName();
        let timer = undefined;
        if (response.status == 200) {
          updateAlert({
            show: true,
            message: RECORD_DELETED_SUCCESS_MSG,
            type: "info",
          });
          router.push(`/catalog/${route}`);
          updateFormLegends({
            ...formLegends,
            isEdit: false,
            performDelete: false,
          });
        } else {
          const data = await response.json();
          updateAlert({ show: true, message: data.message, type: "error" });
        }

        return () => {
          clearTimeout(timer);
        };
      };
      deleteRecord();
    }
  }, [
    formLegends.performDelete,
    actionName,
    formLegends,
    router,
    route,
    updateFormLegends,
    updateAlert,
  ]);
};

export default usePerformDelete;
