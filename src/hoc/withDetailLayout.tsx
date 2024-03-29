import { Box, Stack } from "@mui/joy";
import React, { useContext, useState } from "react";
import Typography from "@mui/material/Typography";
import Fab from "@mui/material/Fab";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";
import DeleteSweepRoundedIcon from "@mui/icons-material/DeleteSweepRounded";
import { FormContext, TFormContext } from "@/context/form-context";
import { useRouter } from "next/router";
import MuiModal from "@/ui/MuiModal";

type TProps<T> = {
  children: React.ReactNode;
  // Additional props that the HOC provides
  title: string;
};

const WithDetailLayoutWrapper = (
  WrapperComponent: React.ElementType,
  wrapperProps?: any
): React.ElementType => {
  const PageWithDetailLayout: React.FunctionComponent<TProps<{}>> = (props) => {
    const [showDeleteModal, setDeleteModal] = useState<boolean>(false);
    const router = useRouter();
    const { formLegends, updateFormLegends } =
      useContext<TFormContext>(FormContext);
    const { isEdit } = formLegends;
    return (
      <Box component="article">
        {!isEdit && (
          <Typography variant="h5" component="summary">
            {props.title}
          </Typography>
        )}
        <WrapperComponent {...props} />
        {!isEdit && (
          <>
            <Stack
              direction="row"
              justifyContent="center"
              gap={2}
              marginTop={4}>
              <Fab
                variant="extended"
                size="medium"
                color="primary"
                role="link"
                aria-label="edit action"
                onClick={() => {
                  updateFormLegends({ ...formLegends, isEdit: true });
                  router.push(`${router.asPath}/update`);
                }}>
                <EditNoteRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                Edit
              </Fab>
              <Fab
                variant="extended"
                size="medium"
                color="error"
                onClick={() => setDeleteModal(true)}
                aria-label="delete action">
                <DeleteSweepRoundedIcon fontSize="small" sx={{ mr: 1 }} />
                Delete
              </Fab>
            </Stack>
            <MuiModal
              title="Confirmation"
              open={showDeleteModal}
              onClose={() => setDeleteModal(false)}
              onConfirm={() => {
                updateFormLegends({ ...formLegends, performDelete: true });
              }}>
              <Typography variant="body2" component="span" align="center">
                Are you certain about deleting this record ?
              </Typography>
            </MuiModal>
          </>
        )}
      </Box>
    );
  };
  return PageWithDetailLayout;
};

export default WithDetailLayoutWrapper;
