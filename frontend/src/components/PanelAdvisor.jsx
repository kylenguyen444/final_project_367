import React, { useState, useEffect, useContext } from 'react';

import PanelLayout from '@layouts/PanelLayout';
import Context from './Context';

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { deepMemo } from '@hooks';
import { postAdvisorProfile } from '@apis';
import { formatPhoneNumber } from '@utils';

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'column',
    },
    heading: {
        fontSize: '2rem',
        fontWeight: 'bold',
        marginBottom: theme.spacing(2),
    },
});

const PanelAdvisor = () => {
    const classes = useStyles();
    const { contextValue, updateContextValue } = useContext(Context);
    const { adv_email } = contextValue.studentProfile || {};
    const [data, setData] = useState([]);

    useEffect(() => {
        postAdvisorProfile({
            adv_email,
            onSuccess: (res) => {
                console.log('res.data[0]', res.data);
                setData(res.data);
            },
        });
    }, []);

    const { adv_firstname, adv_lastname, phone_number, dept_name } = data || {};

    return (
        <PanelLayout title='Advisor Information'>
            <div>
                <b>Name: </b>
                {`${adv_firstname} ${adv_lastname}`}
            </div>
            <div>
                <b>Email: </b>
                {adv_email}
            </div>
            <div>
                <b>Phone number: </b>
                {formatPhoneNumber(phone_number)}
            </div>
            <div>
                <b>Department: </b>
                {dept_name}
            </div>
        </PanelLayout>
    );
};

export default deepMemo(PanelAdvisor);
