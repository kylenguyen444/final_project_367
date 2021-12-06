import React from 'react';

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { deepMemo } from '@hooks';

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    title: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
});

const PanelLayout = ({ title, children }) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <div className={classes.title}>{title}</div>
            {children}
        </div>
    );
};

export default deepMemo(PanelLayout);
