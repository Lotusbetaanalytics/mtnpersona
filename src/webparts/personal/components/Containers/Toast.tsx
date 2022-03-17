import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";

export interface State extends SnackbarOrigin {
  open: boolean;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    close: {
      padding: theme.spacing(0.5),
    },
  })
);

export default function Toast({ show, setShow, message }) {
  const classes = useStyles();
  const [state, setState] = React.useState<State>({
    open: show,
    vertical: "bottom",
    horizontal: "left",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={show}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              className={classes.close}
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      />
    </div>
  );
}
