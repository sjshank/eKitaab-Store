import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

type TModalProps = {
  title: string;
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  children: React.ReactNode;
};

const MuiModal: React.FunctionComponent<TModalProps> = ({
  title,
  open = false,
  onClose,
  onConfirm,
  children,
}) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={() => onClose()}
        aria-labelledby={`modal-dialog-${title}`}
        aria-describedby={`modal-dialog-confirmation`}>
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="error"
            onClick={onConfirm}
            autoFocus>
            Delete
          </Button>
          <Button variant="outlined" color="inherit" onClick={() => onClose()}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MuiModal;
