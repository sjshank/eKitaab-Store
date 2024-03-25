import React, { useMemo } from "react";
import { FormikProps } from "formik";
import { withFormik } from "formik";
import { TAuthor, TBookFormFields, TGenre } from "@/types/book";
import FormLayout from "@/layouts/form";
import { BookFormSchema } from "@/utils/yup-schema";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { BookFormFields } from "@/utils/form-fields";

export type TBookFormProps = {
  book: TBookFormFields;
  onSubmit: (bookFormFieldValues: TBookFormFields) => void;
  buttonLbl?: string;
  authors: TAuthor[];
  genres: TGenre[];
};

const ConnectedForm = (
  props: TBookFormProps & FormikProps<TBookFormFields>
) => {
  const { touched, errors, handleChange, handleBlur, values, authors, genres } =
    props;

  const authorOptions = useMemo(
    () =>
      authors.map((author) => (
        <MenuItem key={author._id} value={author._id}>
          {`${author.first_name} ${author.family_name}`}
        </MenuItem>
      )),
    []
  );

  const genreOptions = useMemo(
    () =>
      genres.map((genre) => (
        <MenuItem key={genre._id} value={genre._id}>
          {genre.name}
        </MenuItem>
      )),
    []
  );

  return (
    <FormLayout formikProps={props} formFields={BookFormFields}>
      <FormControl required sx={{ my: 2 }}>
        <InputLabel id="select-author">Authors</InputLabel>
        <Select
          id="author"
          labelId="select-author"
          label="Authors"
          name="author"
          size="medium"
          required
          tabIndex={0}
          color="primary"
          value={values.author}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.author) && touched.author}>
          {authorOptions}
        </Select>
        <FormHelperText className="Mui-error">
          {touched.author && errors.author}
        </FormHelperText>
      </FormControl>

      <FormControl required sx={{ my: 2 }}>
        <InputLabel id="select-genres">Genres</InputLabel>
        <Select
          id="genre"
          labelId="select-genres"
          label="Genres"
          name="genre"
          size="medium"
          required
          tabIndex={0}
          color="primary"
          multiple
          value={values.genre}
          onBlur={handleBlur}
          onChange={handleChange}
          error={Boolean(errors.genre) && touched.genre}>
          {genreOptions}
        </Select>
        <FormHelperText className="Mui-error">
          {touched.genre && errors.genre}
        </FormHelperText>
      </FormControl>
    </FormLayout>
  );
};

const BookForm = withFormik<TBookFormProps, TBookFormFields>({
  mapPropsToValues: (props) => {
    return {
      _id: props.book?._id || "",
      title: props.book?.title || "",
      author: props.book?.author || "",
      genre: props.book?.genre || "",
      isbn: props.book?.isbn || "",
      summary: props.book?.summary || "",
    };
  },
  validationSchema: BookFormSchema,

  handleSubmit: (values, formikBag) => {
    const { props, setSubmitting } = formikBag;
    // console.log(values);
    props.onSubmit(values);
    setSubmitting(false);
  },
})(ConnectedForm);

export default BookForm;
