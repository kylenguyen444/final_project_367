import React, { useState, useEffect, useContext } from 'react';

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { deepMemo } from '@hooks';
import Header from '@layouts/Header';
import colors from '@colors';
import VerticalTabs from '@components/VerticalTab';
import Context from '@components/Context';
import { Link } from 'react-router-dom';

const theme = createTheme();
const useStyles = makeStyles({
    introduction: {
        padding: theme.spacing(1),
    },
    heading: {
        display: 'flex',
        flexDirection: 'row',
        padding: `${theme.spacing(2)} ${theme.spacing(1)}`,
        backgroundColor: colors.primary,
        fontSize: '2rem',
        color: colors.white,
        justifyContent: 'space-between',
    },
    logout: {
        textDecoration: 'none',
        color: colors.white,
        '&:hover': {
            transition: 'all 0.3s ease',
            textDecoration: 'underline',
        },
    },
});

const Homepage = ({}) => {
    const classes = useStyles();
    const { contextValue, updateContextValue } = useContext(Context);
    const { stu_firstname, stu_lastname } = contextValue.studentProfile || {};

    return (
        <div>
            <Header />
            <div className={classes.heading}>
                <div>{`Welcome, ${stu_firstname}`}</div>
                <Link to='/' className={classes.logout}>
                    Log out
                </Link>
            </div>
            <VerticalTabs />
        </div>
    );
};

export default deepMemo(Homepage);
