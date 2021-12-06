import React, { useState, useEffect, useContext } from 'react';

import Context from './Context';
import PanelLayout from '@layouts/PanelLayout';
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { deepMemo } from '@hooks';
import { postTakenCourses } from '@apis';
import { countDomain } from '@utils';
import colors from '@colors';

const theme = createTheme();
const useStyles = makeStyles({});

const styles = {
    root: {
        maxHeight: 500,
        marginBottom: '2rem',
    },
    widthRoot: {
        minWidth: 400,
    },
    tableTitle: {
        fontWeight: 'bold',
        fontSize: '1.5rem',
        backgroundColor: colors.primary,
        color: colors.white,
    },
    tableLabel: {
        fontWeight: 'bold',
        fontSize: '1.2rem',
        backgroundColor: colors.primary,
        color: colors.white,
    },
    column: {
        fontSize: '0.8rem',
    },
};

const PanelGraduation = ({}) => {
    const classes = useStyles();
    const { contextValue, updateContextValue } = useContext(Context);
    const { gradRequirement } = contextValue;
    const { stu_id } = contextValue.studentProfile || {};
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        postTakenCourses({
            stu_id,
            onSuccess: (res) => {
                const temp = countDomain(res.data);
                for (let i = 0; i < temp.length; i++) {
                    temp[i]['complete'] = `${temp[i].taken}/${
                        gradRequirement[i].num_course_required || '0'
                    }`;
                }
                setData(temp);
                setTimeout(() => {
                    setLoading(false);
                }, 350);
            },
        });
    }, []);

    return (
        <PanelLayout title='Graduation Requirement'>
            {loading ? (
                <Box sx={styles.widthRoot}>
                    <LinearProgress />
                </Box>
            ) : (
                <TableContainer component={Paper} sx={styles.widthRoot}>
                    <Table
                        stickyHeader
                        sx={{ minWidth: 400 }}
                        aria-label='simple table'
                    >
                        <TableHead>
                            <TableRow>
                                <TableCell align='left' sx={styles.tableLabel}>
                                    Domain
                                </TableCell>
                                <TableCell align='right' sx={styles.tableLabel}>
                                    Completion
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data &&
                                data?.map?.((row, index) => (
                                    <TableRow
                                        key={index}
                                        sx={{
                                            '&:last-child td, &:last-child th':
                                                {
                                                    border: 0,
                                                },
                                        }}
                                    >
                                        <TableCell
                                            component='th'
                                            scope='row'
                                            sx={styles.column}
                                        >
                                            {row.require}
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                            sx={styles.column}
                                        >
                                            {row.complete}
                                        </TableCell>
                                    </TableRow>
                                ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </PanelLayout>
    );
};

export default deepMemo(PanelGraduation);
