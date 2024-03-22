export const BOOK_COPIES_TABLE_HEADER = ["Id", "Status", "Imprint", "Due Date"];
export const STATUS_IDENTITY_MAP = Object.seal({
  Available: "#83ce1a",
  Maintenance: "#E3651D",
  Loaned: "#711DB0",
  Reserved: "#7D7C7C",
});

export const SIDEBAR_NAVIGATIONS = [
  {
    label: "Home",
    children: [
      {
        label: "Back To Home",
        path: "/",
      },
    ],
  },
  {
    label: "Books",
    children: [
      {
        label: "All Books",
        path: "/catalog/books",
      },
      {
        label: "Register New Book",
        path: "/catalog/book/register",
      },
    ],
  },
  {
    label: "Authors",
    children: [
      {
        label: "All Authors",
        path: "/catalog/authors",
      },
      {
        label: "Register New Author",
        path: "/catalog/author/register",
      },
    ],
  },
  {
    label: "Genres",
    children: [
      {
        label: "All Genres",
        path: "/catalog/genres",
      },
      {
        label: "Register New Genre",
        path: "/catalog/genre/register",
      },
    ],
  },
  {
    label: "Book Instances",
    children: [
      {
        label: "All Book Instances",
        path: "/catalog/bookinstances",
      },
      {
        label: "Create Book Instance (Copy)",
        path: "/catalog/bookinstance/create",
      },
    ],
  },
];
