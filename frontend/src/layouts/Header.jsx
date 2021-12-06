import React, { useState, useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import images from '@assets';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { deepMemo } from '@hooks';

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    logo: {
        backgroundImage: `url(${images.logo})`,
        display: 'inline-block',
        width: '150px',
        height: '150px',
        backgroundPosition: `center center`,
        backgroundSize: 'cover',
    },
    cover: {
        backgroundImage: `url(${images.long_middle_college})`,
        display: 'inline-block',
        height: '150px',
        width: '100%',
        backgroundPosition: `center center`,
        backgroundSize: 'cover',
    },
});

const Header = () => {
    const classes = useStyles();

    return (
        <Link to='/'>
            <div className={classes.root}>
                <div className={classes.logo} />
                <div className={classes.cover} />
            </div>
        </Link>
    );
};

export default deepMemo(Header);
