import { render, screen } from "@testing-library/react";
import GenreFormFields from "./genre-form-fields";
import userEvent from "@testing-library/user-event";

const mockFormFieldProps = {
  values: {
    name: "",
  },
  touched: {
    name: false,
  },
  errors: {
    name: "",
  },
  isSubmitting: false,
  //   handleChange: jest.fn(),
  //   handleBlur: jest.fn(),
};

const mockHandleChange = jest.fn();
const mockHandleBlur = jest.fn();

describe("Genre Form Fields - Render", () => {
  it("Should render a text input field", () => {
    render(<GenreFormFields {...mockFormFieldProps} />);
    const ele = screen.getByRole("textbox");
    expect(ele).toBeInTheDocument();
  });

  it("Should render a disabled text input field", () => {
    mockFormFieldProps.isSubmitting = true;
    render(<GenreFormFields {...mockFormFieldProps} />);
    const ele = screen.getByRole("textbox");
    expect(ele).toBeDisabled();
  });

  it("Should render a validation error ", () => {
    mockFormFieldProps.isSubmitting = false;
    mockFormFieldProps.touched.name = true;
    mockFormFieldProps.errors.name = "This field is required";
    render(<GenreFormFields {...mockFormFieldProps} />);
    const ele = screen.getByRole("textbox");
    expect(ele.parentElement?.className).toContain("Mui-error");
  });
});

// describe("Genre Form Fields - Behavior", () => {
//   it("Should able to add text to input", async () => {
//     render(
//       <GenreFormFields
//         {...mockFormFieldProps}
//         handleChange={mockHandleChange}
//         handleBlur={mockHandleBlur}
//       />
//     );
//     const ele = screen.getByRole("textbox");
//     await userEvent.type(ele, "Action");
//     expect(ele).toHaveValue("Action");
//   });
// });
