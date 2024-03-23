import { Box, Stack } from "@mui/joy";
import React from "react";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { useRouter } from "next/router";
// import LibraryBooksRoundedIcon from "@mui/icons-material/LibraryBooksRounded";

const WithDetailLayoutWrapper = (
  WrapperComponent: React.ElementType,
  wrapperProps?: any
): React.ElementType => {
  const PageWithDetailLayout = (props: any) => {
    const router = useRouter();
    const { title } = props;
    console.log(props);
    return (
      <Box component="article">
        <Typography variant="h5" component="summary">
          {/* <LibraryBooksRoundedIcon
            sx={{ mr: 1, color: "primary" }}
            color="primary"
          /> */}
          {title}
        </Typography>
        <WrapperComponent {...props} />
        <Stack direction="row" justifyContent="center" gap={2} marginTop={4}>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            role="link"
            aria-label="edit action"
            onClick={() => router.push(`${router.asPath}/update`)}>
            <EditNoteRoundedIcon fontSize="small" sx={{ mr: 1 }} />
            Edit
          </Fab>
          <Fab
            variant="extended"
            size="medium"
            color="error"
            aria-label="delete action">
            <DeleteSweepRoundedIcon fontSize="small" sx={{ mr: 1 }} />
            Delete
          </Fab>
        </Stack>
      </Box>
    );
  };
  return PageWithDetailLayout;
};

export default WithDetailLayoutWrapper;
