import React, { useState } from 'react'
import { Button } from "@material-ui/core";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import classNames from "classnames";

export default function AlertModal() {
    
    const [open, setOpen] = useState(false);

    const useStyles = makeStyles({
        buttonStyles: {
            borderRadius: '200px',
            textTransform: 'lowercase',
            fontWeight: 'bold',
        },
        buttonGhost: {

        },
        buttonFull: {
            color: 'white',
        },
    });

    const classes = useStyles();

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <React.Fragment>
            <Grid item xs={3}>
                <Button color="primary" variant="contained" className={classNames(classes.buttonStyles, classes.buttonFull)} onClick={() => handleClickOpen()}>Get Started</Button>
            </Grid>
            <Grid item xs={3}>
                <Button color="primary" variant="outlined" className={classes.buttonStyles} onClick={() => handleClickOpen()}>Subscribe</Button>
            </Grid>
            <Dialog
                open={open}
                onClose={handleClose}
            >
            <DialogTitle id="alert-dialog-title">{"Thank you for your purchase!"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    $5000.00 has been deducted from the account you most recently used on Amazon. The team at Notey hopes you will enjoy the service. Thank you for your purchase!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                    You're welcome
                    </Button>
                    <Button onClick={handleClose} color="primary" autoFocus>
                    It was my pleasure
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
