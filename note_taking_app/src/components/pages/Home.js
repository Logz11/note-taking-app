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
                        Welcome to Notey Notes, the smarter note-taking platform designed to make your study sessions collaborative at a CDC-approved distance. Notey learns alongside you and your classmates and will recommend highlights based on what other students found important. As you highlight, Notey will identify where you might need more practice and tailor study materials—like flashcards and end-of-section quizzes—to meet your needs so you can ace that next exam.
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
