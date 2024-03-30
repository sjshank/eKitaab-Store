import React, { createContext, useEffect, useState } from "react";
import { AlertColor } from "@mui/material/Alert";

export type TAlert = {
  show: boolean;
  type: AlertColor;
  message: string;
};

type TAlertContextProps = {
  children: React.ReactNode;
};

export type TAlertContext = {
  alert: TAlert;
  updateAlert: (alert: TAlert) => void;
};

export const AlertContext = createContext<TAlertContext>({} as TAlertContext);

const AlertContextProvider: React.FunctionComponent<TAlertContextProps> = ({
  children,
}): React.JSX.Element => {
  const [alert, setAlert] = useState<TAlert>({} as TAlert);

  useEffect(() => {
    if (alert.show) {
      const timer = setTimeout(function () {
        setAlert({} as TAlert);
      }, 3000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [alert.show]);

  const updateAlertHandler = (_alert: TAlert) => {
    if (_alert.show) {
      setAlert(_alert);
    } else {
      setAlert({} as TAlert);
    }
  };
  return (
    <AlertContext.Provider
      value={{ alert: alert, updateAlert: updateAlertHandler }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContextProvider;
