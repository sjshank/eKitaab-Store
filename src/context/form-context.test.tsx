import { ReactNode, useContext, useEffect } from "react";
import FormContextProvider, { FormContext, TFormContext } from "./form-context";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const TestComponent = ({ children }: { children: ReactNode }) => (
  <FormContextProvider>
    <>
      {children}
      <ContextConsumerComponent />
    </>
  </FormContextProvider>
);

const ContextConsumerComponent = () => {
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  const { isEdit } = formLegends;
  const handleEditAction = () => {
    updateFormLegends({ ...formLegends, isEdit: true });
  };
  return (
    <>
      {isEdit && <div>Editable section</div>}
      {!isEdit && (
        <div>
          <p>Non-Editable section</p>
          <button onClick={handleEditAction}>Edit</button>
        </div>
      )}
    </>
  );
};

const FormContextCaller = () => {
  const { formLegends, updateFormLegends } =
    useContext<TFormContext>(FormContext);
  useEffect(() => {
    updateFormLegends({ ...formLegends, isEdit: false });
  }, []);

  return <></>;
};

describe("Form Context", () => {
  it("renders correctly with non-editable section", () => {
    render(
      <TestComponent>
        <FormContextCaller />
      </TestComponent>
    );

    expect(screen.getByText("Non-Editable section")).toBeInTheDocument();
  });

  it("renders correctly with editable section on button click", async () => {
    render(
      <TestComponent>
        <FormContextCaller />
      </TestComponent>
    );

    expect(screen.getByText("Non-Editable section")).toBeInTheDocument();
    const btnEle = screen.getByRole("button");
    await userEvent.click(btnEle);
    expect(screen.getByText("Editable section")).toBeInTheDocument();
  });
});
