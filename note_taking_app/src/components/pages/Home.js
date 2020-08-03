import React from 'react';
import Background from "../../styles/studying.jpg";
import { Button, Typography } from "@material-ui/core";
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import classNames from "classnames";
import AlertModal from '../AlertModal.js'

export default function Home() {

    const useStyles = makeStyles({
        helloWorldStyle: {
            fontStyle: 'oblique'
        },
        landingPage: {
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${Background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            height: '100%',
        },
    });

    const classes = useStyles();
    
    return (
        <div className={classes.landingPage}>
            <Grid container
            style={{marginLeft: '2.5%', width: '50%', height: '100%'}}
            direction="column"
            justify="space-around">
                <Grid item>
                    <Typography className={classes.helloWorldStyle} color="primary" variant="h1" style={{minWidth: '143px'}}>
                        Notey Notes
                    </Typography>
                </Grid>
                <Grid item>
                    <Typography variant="body1" color="secondary">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </Typography>
                </Grid>
                <Grid item container
                style={{minWidth: '645px'}}>
                    <AlertModal />
                </Grid>
            </Grid>
        </div>
    );
}
