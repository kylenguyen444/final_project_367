import React, { useState, useEffect, useRef } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { deepMemo } from '@hooks';
import colors from '@colors';
import InfoModal from './InfoModal';

const styles = {
    root: {
        maxHeight: 500,
        marginBottom: '2rem',
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

const DataTable = ({ type, data, major }) => {
    const [rows, setRows] = useState([]);
    const [title, setTitle] = useState();
    const infoModalRef = useRef(null);

    useEffect(() => {
        setRows(data);
    }, [data]);

    useEffect(() => {
        setTitle(major);
    }, [major]);

    if (Array.isArray(rows) && rows.length === 0 && title === undefined) {
        return null;
    }
    return (
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
                        >{`${type}: ${title}`}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell align='left' sx={styles.tableLabel}>
                            Courses to take
                        </TableCell>
                        <TableCell align='right' sx={styles.tableLabel}>
                            Course name
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows &&
                        rows?.map?.((row) => (
                            <TableRow
                                key={row.course_id}
                                sx={{
                                    '&:last-child td, &:last-child th': {
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
                                <TableCell align='right' sx={styles.column}>
                                    {row.course_name.trim()}
                                </TableCell>
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
            <InfoModal ref={infoModalRef} />
        </TableContainer>
    );
};

export default deepMemo(DataTable);
