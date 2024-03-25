export type TBook = {
  _id: string;
  title: string;
  summary: string;
  isbn: string;
  genre: TGenre[];
  author: TAuthor;
};

export type TBookFormFields = Omit<TBook, "author" | "genre"> & {
  author: string;
  genre: string[];
};

export type TAuthor = {
  _id: string;
  first_name: string;
  family_name: string;
  date_of_birth: string;
  date_of_death: string;
};

export type TAllBooks = {
  _id: string;
  title: string;
  author: TAuthor;
};

export type TGenre = {
  _id: string;
  name: string;
};

export type TBookInstance = {
  _id: string;
  book: TBook;
  imprint: string;
  status: "Available" | "Maintenance" | "Loaned" | "Reserved";
  due_back: string;
};
