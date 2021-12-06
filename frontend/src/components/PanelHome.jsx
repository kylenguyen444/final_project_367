import React, { useState, useEffect, useRef, useContext } from 'react';

import Context from './Context';
import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import { deepMemo } from '@hooks';
import PanelLayout from '@layouts/PanelLayout';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    postStudentMajors,
    postStudentMinors,
    postCourseTakenFromId,
} from '@apis';
import colors from '@colors';
import uniqBy from 'lodash/uniqBy';
import InfoModal from './InfoModal';

const theme = createTheme();
const useStyles = makeStyles({
    root: {
        display: 'flex',
        flexDirection: 'row',
    },
    quickLink: {
        marginLeft: '10rem',
        width: 200,
        height: 200,
        backgroundColor: colors.primary,
        padding: `${theme.spacing(2)} ${theme.spacing(4)}`,
    },
    quickLinkTitle: {
        fontSize: '2rem',
        color: colors.white,
    },
    item: {
        margin: `${theme.spacing(0.5)} 0`,
        color: colors.yellow,
        cursor: 'pointer',
    },
});

const styles = {
    root: {
        maxHeight: 500,
        margin: '2rem 0',
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

const PanelHome = () => {
    const classes = useStyles();
    const { contextValue, updateContextValue } = useContext(Context);
    const {
        stu_id,
        stu_firstname,
        stu_lastname,
        adv_firstname,
        adv_lastname,
        gpa
    } = contextValue.studentProfile || {};

    const [major, setMajor] = useState('');
    const [minor, setMinor] = useState('');
    const [takenCourses, setTakenCourses] = useState([]);
    const [credits, setCredits] = useState();
    const infoModalRef = useRef(null);

    useEffect(() => {
        if (stu_id) {
            postStudentMajors({
                stu_id,
                onSuccess: (response) => {
                    const temp = [];
                    response?.data?.forEach((item) =>
                        temp.push(item.major.trim())
                    );
                    setMajor(temp.join(', '));
                },
            });
            postStudentMinors({
                stu_id,
                onSuccess: (response) => {
                    const temp = [];
                    response?.data?.forEach((item) =>
                        temp.push(item.minor.trim())
                    );
                    setMinor(temp.join(', '));
                },
            });
            // show all courses taken count credits (<14)
            postCourseTakenFromId({
                stu_id,
                onSuccess: (response) => {
                    const count = {};
                    response.data.forEach((item) => {
                        count[item.dept_id] = (count[item.dept_id] || 0) + item.course_credit
                    })
                    const temp = [];
                    Object.values(count).forEach((item) => {
                        if (item >= 14) {
                            temp.push(14)
                        } else {
                            temp.push(item)
                        }
                    })
                    setTakenCourses(response?.data);
                    setCredits(temp.reduce((a, b) => a + b));
                },
            });
        }
    }, [stu_id]);

    return (
        <PanelLayout title='Home'>
            <div className={classes.root}>
                {takenCourses?.length > 0 && (
                    <div>
                        <div>
                            <b>Name: </b>
                            {`${stu_firstname} ${stu_lastname}`}
                        </div>
                        <div>
                            <b>Major: </b>
                            {major}
                        </div>
                        <div>
                            <b>Minor: </b>
                            {minor}
                        </div>
                        <div>
                            <b>Advisor: </b>
                            {`${adv_firstname} ${adv_lastname}`}
                        </div>
                        <div>
                            <b>GPA: </b>
                            {Math.round(
                                (takenCourses.reduce((a, b) => ({
                                    grade: a.grade + b.grade,
                                })).grade /
                                    takenCourses.length) *
                                    100
                            ) / 100}
                        </div>
                        <div>
                            <b>Credit: </b>
                            {credits}
                        </div>
                        <TableContainer component={Paper} sx={styles.root}>
                            <Table
                                stickyHeader
                                sx={{ minWidth: 800 }}
                                aria-label='simple table'
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell
                                            sx={styles.tableTitle}
                                            colSpan={3}
                                        >
                                            All courses taken
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell
                                            align='left'
                                            sx={styles.tableLabel}
                                        >
                                            Courses you have taken
                                        </TableCell>
                                        <TableCell
                                            align='center'
                                            sx={styles.tableLabel}
                                        >
                                            Credit
                                        </TableCell>
                                        <TableCell
                                            align='right'
                                            sx={styles.tableLabel}
                                        >
                                            Grade
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {takenCourses?.map?.((row) => (
                                        <TableRow
                                            key={row.course_id}
                                            sx={{
                                                '&:last-child td, &:last-child th':
                                                    {
                                                        border: 0,
                                                    },
                                                cursor: 'pointer',
                                            }}
                                            onClick={() => {
                                                infoModalRef?.current?.handleOpen(
                                                    row.course_id
                                                );
                                            }}
                                        >
                                            <TableCell
                                                component='th'
                                                scope='row'
                                                sx={styles.column}
                                            >
                                                {row.course_id}
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={styles.column}
                                            >
                                                {row.course_credit}
                                            </TableCell>
                                            <TableCell
                                                align='right'
                                                sx={styles.column}
                                            >
                                                {row.grade}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
                <div className={classes.quickLink}>
                    <div className={classes.quickLinkTitle}>Quick links</div>
                    <div
                        className={classes.item}
                        onClick={() =>
                            window.open('https://moodle.beloit.edu/', '_blank')
                        }
                    >
                        Moodle
                    </div>
                    <div
                        className={classes.item}
                        onClick={() =>
                            window.open('http://portal.beloit.edu/', '_blank')
                        }
                    >
                        Portal
                    </div>
                    <div
                        className={classes.item}
                        onClick={() =>
                            window.open('http://beloit.edu/', '_blank')
                        }
                    >
                        Beloit Home Page
                    </div>
                </div>
            </div>
            <InfoModal ref={infoModalRef} />
        </PanelLayout>
    );
};

export default deepMemo(PanelHome);
