import * as Yup from "yup";

export const GenreFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
});

export const AuthorFormSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  family_name: Yup.string()
    .min(3, "Too Short!")
    .max(30, "Too Long!")
    .required("Required"),
  date_of_birth: Yup.date().optional(),
  date_of_death: Yup.date().optional(),
});

export const BookFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  summary: Yup.string().min(5, "Too Short!").required("Required"),
  isbn: Yup.string()
    .min(3, "Too Short!")
    .max(25, "Too Long!")
    .required("Required"),
  author: Yup.string().required("Required"),
  genre: Yup.array().min(1, "Required"),
});

export const BookInstanceFormSchema = Yup.object().shape({
  book: Yup.string().required("Required"),
  imprint: Yup.string().max(80, "Too Long!").required("Required"),
  dueDate: Yup.date().optional(),
  status: Yup.string().optional(),
});
