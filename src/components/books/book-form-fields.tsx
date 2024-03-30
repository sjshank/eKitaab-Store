import React, { useMemo } from "react";
import TextField from "@mui/material/TextField";
import { FormikProps } from "formik";
import { TAuthor, TGenre } from "@/types/book";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormHelperText from "@mui/material/FormHelperText";

const BookFieldProps = {
  title: {
    id: "title",
    name: "title",
    label: "Title",
    value: "title",
    required: true,
  },
  summary: {
    id: "summary",
    name: "summary",
    label: "Summary",
    value: "summary",
    required: true,
  },
  isbn: {
    id: "isbn",
    name: "isbn",
    label: "ISBN",
    value: "isbn",
    required: true,
  },
  author: {
    id: "author",
    name: "author",
    label: "Authors",
    value: "author",
    labelId: "select-author",
    required: true,
  },
  genres: {
    id: "genre",
    name: "genre",
    label: "Genres",
    value: "genre",
    labelId: "select-genre",
    required: true,
  },
};

const BookFormFields = ({
  values,
  handleChange,
  handleBlur,
  touched,
  errors,
  authors,
  genres,
  isSubmitting,
}: FormikProps<any> & any) => {
  const authorOptions = useMemo(
    () =>
      authors.map((author: TAuthor) => (
        <MenuItem key={author._id} value={author._id}>
          {`${author.first_name} ${author.family_name}`}
        </MenuItem>
      )),
    [authors]
  );

  const genreOptions = useMemo(
    () =>
      genres.map((genre: TGenre) => (
        <MenuItem key={genre._id} value={genre._id}>
          {genre.name}
        </MenuItem>
      )),
    [genres]
  );

  return (
    <>
      <TextField
        {...BookFieldProps.title}
        fullWidth
        variant="outlined"
        disabled={isSubmitting}
        margin="dense"
        sx={{ my: 2 }}
        value={values[BookFieldProps.title.name]}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={
          touched[BookFieldProps.title.name] &&
          errors[BookFieldProps.title.name]
        }
        error={
          Boolean(errors[BookFieldProps.title.name]) &&
          touched[BookFieldProps.title.name]
        }
        required></TextField>
      <TextField
        {...BookFieldProps.summary}
        fullWidth
        variant="outlined"
        disabled={isSubmitting}
        margin="dense"
        sx={{ my: 2 }}
        value={values[BookFieldProps.summary.name]}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={
          touched[BookFieldProps.summary.name] &&
          errors[BookFieldProps.summary.name]
        }
        error={
          Boolean(errors[BookFieldProps.summary.name]) &&
          touched[BookFieldProps.summary.name]
        }></TextField>
      <TextField
        {...BookFieldProps.isbn}
        fullWidth
        variant="outlined"
        disabled={isSubmitting}
        margin="dense"
        sx={{ my: 2 }}
        value={values[BookFieldProps.isbn.name]}
        onChange={handleChange}
        onBlur={handleBlur}
        helperText={
          touched[BookFieldProps.isbn.name] && errors[BookFieldProps.isbn.name]
        }
        error={
          Boolean(errors[BookFieldProps.isbn.name]) &&
          touched[BookFieldProps.isbn.name]
        }></TextField>

      <FormControl required sx={{ my: 2 }}>
        <InputLabel id={BookFieldProps.author.label}>
          {BookFieldProps.author.label}
        </InputLabel>
        <Select
          {...BookFieldProps.author}
          size="medium"
          required
          disabled={isSubmitting}
          tabIndex={0}
          color="primary"
          value={values[BookFieldProps.author.name]}
          onBlur={handleBlur}
          onChange={handleChange}
          error={
            Boolean(errors[BookFieldProps.author.name]) &&
            touched[BookFieldProps.author.name]
          }>
          {authorOptions}
        </Select>
        <FormHelperText className="Mui-error">
          {touched[BookFieldProps.author.name] &&
            errors[BookFieldProps.author.name]}
        </FormHelperText>
      </FormControl>

      <FormControl required sx={{ my: 2 }}>
        <InputLabel id={BookFieldProps.genres.label}>
          {BookFieldProps.genres.label}
        </InputLabel>
        <Select
          {...BookFieldProps.genres}
          size="medium"
          required
          disabled={isSubmitting}
          tabIndex={0}
          color="primary"
          multiple
          value={values[BookFieldProps.genres.name]}
          onBlur={handleBlur}
          onChange={handleChange}
          error={
            Boolean(errors[BookFieldProps.genres.name]) &&
            touched[BookFieldProps.genres.name]
          }>
          {genreOptions}
        </Select>
        <FormHelperText className="Mui-error">
          {touched[BookFieldProps.genres.name] &&
            errors[BookFieldProps.genres.name]}
        </FormHelperText>
      </FormControl>
    </>
  );
};

export default BookFormFields;
