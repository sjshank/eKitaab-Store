import { FormContext, TFormContext } from "@/context/form-context";
import React, { useContext, useEffect } from "react";

const useFormLegends = (formTitle: string, ctaLabel: string) => {
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);

  useEffect(() => {
    updateFormLegends({
      ...formLegends,
      formTitle: formTitle,
      ctaLabel: ctaLabel,
    });
  }, [formLegends.isEdit, ctaLabel, formTitle]);
};

export default useFormLegends;
