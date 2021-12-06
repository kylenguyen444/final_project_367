import React, { useState, useEffect, useContext } from 'react';

import DataTable from './DataTable';
import PanelLayout from '@layouts/PanelLayout';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Context from './Context';

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { deepMemo } from '@hooks';
import { postRemaningCoursesMajor, postStudentMajors } from '@apis';

const theme = createTheme();
const useStyles = makeStyles({});

const PanelMajor = ({}) => {
    const classes = useStyles();
    const { contextValue, updateContextValue } = useContext(Context);
    const { stu_id, stu_email } = contextValue.studentProfile;
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (stu_id && stu_email) {
            setLoading(true);
            postStudentMajors({
                stu_id,
                onSuccess: (res) => {
                    const temp = [];
                    res?.data?.forEach?.((item) => {
                        postRemaningCoursesMajor({
                            major_id: item.major_id,
                            stu_email,
                            onSuccess: (response) => {
                                temp.push({
                                    major: item.major,
                                    courses: response.data,
                                });
                            },
                        });
                    });
                    setData(temp);
                    setTimeout(() => {
                        setLoading(false);
                    }, 350);
                },
                onError: () =>
                    setTimeout(() => {
                        setLoading(false);
                    }, 350),
            });
        }
    }, [stu_id, stu_email]);

    return (
        <PanelLayout title='Major Requirement'>
            {loading && (
                <Box sx={{ minWidth: 800 }}>
                    <LinearProgress />
                </Box>
            )}
            {!loading &&
                data.map((item, index) => (
                    <DataTable
                        type='Major'
                        key={index}
                        data={item.courses}
                        major={item.major}
                    />
                ))}
        </PanelLayout>
    );
};

export default deepMemo(PanelMajor);
