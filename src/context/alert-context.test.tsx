import { ReactNode, useContext, useEffect } from "react";
import AlertContextProvider, {
  AlertContext,
  TAlertContext,
} from "./alert-context";
import MuiAlert from "@/ui/MuiAlert";
import { render, screen } from "@testing-library/react";
import { AlertColor } from "@mui/material/Alert";

const TestComponent = ({ children }: { children: ReactNode }) => (
  <AlertContextProvider>
    {children}
    <MuiAlert />
  </AlertContextProvider>
);

const AlertCaller = ({
  message,
  type,
}: {
  message: string;
  type: AlertColor;
}) => {
  const { updateAlert } = useContext<TAlertContext>(AlertContext);

  useEffect(() => {
    updateAlert({
      show: true,
      message: message,
      type: type,
    });
  }, []);

  return <div />;
};

describe("Alert Context", () => {
  it("renders correctly with success message", () => {
    const alertProps = {
      message: "Success Message",
      type: "success" as AlertColor,
    };
    render(
      <TestComponent>
        <AlertCaller {...alertProps} />
      </TestComponent>
    );

    expect(screen.getByText("Success Message")).toBeInTheDocument();
  });
  it("renders correctly with error message", () => {
    const alertProps = {
      message: "Error Message",
      type: "error" as AlertColor,
    };
    render(
      <TestComponent>
        <AlertCaller {...alertProps} />
      </TestComponent>
    );
    expect(screen.getByText("Error Message")).toBeInTheDocument();
    expect(screen.getByTestId("alert").className).toContain(
      "MuiAlert-colorError"
    );
  });
});
