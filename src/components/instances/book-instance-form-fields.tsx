import React, { useContext, useMemo } from "react";
import TextField from "@mui/material/TextField";
import { TextFieldProps } from "@mui/material";
import { DatePicker, DatePickerProps } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import { FormikProps, FormikValues } from "formik";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { BOOK_INSTANCE_STATUS } from "@/utils/constants";
import { TBook } from "@/types/book";
import { FormContext, TFormContext } from "@/context/form-context";

const CommonTextFieldProps: Partial<TextFieldProps> = {
  fullWidth: true,
  variant: "outlined",
  margin: "dense",
  sx: { my: 2 },
};

const CommonDatePickerProps: Partial<DatePickerProps<any>> = {
  autoFocus: false,
  formatDensity: "spacious",
  reduceAnimations: true,
  sx: { my: 2 },
  disableFuture: false,
};

const BookInstanceFieldProps = {
  book: {
    id: "book",
    name: "book",
    label: "Book",
    value: "book",
    labelId: "select-book",
    required: true,
  },
  imprint: {
    ...CommonTextFieldProps,
    id: "imprint",
    name: "imprint",
    label: "Imprint",
    value: "imprint",
    required: true,
  },
  dueBack: {
    ...CommonDatePickerProps,
    id: "due_back",
    name: "due_back",
    label: "Date When Book Available",
    // minDate: dayjs(),
  },
  status: {
    id: "status",
    name: "status",
    label: "Status",
    value: "status",
    labelId: "select-status",
    required: true,
  },
};

const BookInstanceFormFields: React.FunctionComponent<
  FormikProps<FormikValues> & any
> = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  setFieldValue,
  books,
  isSubmitting,
}) => {
  const { formLegends } = useContext<TFormContext>(FormContext);
  const { isEdit } = formLegends;

  const bookOptions = useMemo(
    () =>
      books.map((book: TBook) => (
        <MenuItem key={book._id} value={book._id}>
          {book.title}
        </MenuItem>
      )),
    [books]
  );

  const statusOptions = useMemo(
    () =>
      BOOK_INSTANCE_STATUS.map((status: string, index: number) => (
        <MenuItem key={`${status}-${index}`} value={status}>
          {status}
        </MenuItem>
      )),
    [BOOK_INSTANCE_STATUS]
  );
  return (
    <>
      <FormControl required sx={{ my: 2 }}>
        <InputLabel id={BookInstanceFieldProps.book.label}>
          {BookInstanceFieldProps.book.label}
        </InputLabel>
        <Select
          {...BookInstanceFieldProps.book}
          size="medium"
          required
          tabIndex={0}
          disabled={isEdit || isSubmitting}
          color="primary"
          value={values[BookInstanceFieldProps.book.name]}
          onBlur={handleBlur}
          onChange={handleChange}
          error={
            Boolean(errors[BookInstanceFieldProps.book.name]) &&
            touched[BookInstanceFieldProps.book.name]
          }>
          {bookOptions}
        </Select>
        <FormHelperText className="Mui-error">
          {touched[BookInstanceFieldProps.book.name] &&
            errors[BookInstanceFieldProps.book.name]}
        </FormHelperText>
      </FormControl>
      <TextField
        {...BookInstanceFieldProps.imprint}
        value={values[BookInstanceFieldProps.imprint.name]}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={isSubmitting}
        helperText={
          touched[BookInstanceFieldProps.imprint.name] &&
          errors[BookInstanceFieldProps.imprint.name]
        }
        error={
          Boolean(errors[BookInstanceFieldProps.imprint.name]) &&
          touched[BookInstanceFieldProps.imprint.name]
        }></TextField>

      <DatePicker
        {...CommonDatePickerProps}
        {...BookInstanceFieldProps.dueBack}
        value={dayjs(values.due_back)}
        disabled={isSubmitting}
        onChange={(value) =>
          value ?? setFieldValue("due_back", dayjs(value).toISOString(), true)
        }
        slotProps={{
          textField: {
            margin: "dense",
            helperText:
              touched[BookInstanceFieldProps.dueBack.name] &&
              errors[BookInstanceFieldProps.dueBack.name],
          },
        }}
      />

      <FormControl required sx={{ my: 2 }}>
        <InputLabel id={BookInstanceFieldProps.status.label}>
          {BookInstanceFieldProps.status.label}
        </InputLabel>
        <Select
          {...BookInstanceFieldProps.status}
          size="medium"
          required
          tabIndex={0}
          disabled={isSubmitting}
          color="primary"
          value={values[BookInstanceFieldProps.status.name]}
          onBlur={handleBlur}
          onChange={handleChange}
          error={
            Boolean(errors[BookInstanceFieldProps.status.name]) &&
            touched[BookInstanceFieldProps.status.name]
          }>
          {statusOptions}
        </Select>
        <FormHelperText className="Mui-error">
          {touched[BookInstanceFieldProps.status.name] &&
            errors[BookInstanceFieldProps.status.name]}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default BookInstanceFormFields;
