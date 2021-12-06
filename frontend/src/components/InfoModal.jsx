// course description //
import React, {
    useState,
    useEffect,
    forwardRef,
    useImperativeHandle,
} from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import CircularProgress from '@mui/material/CircularProgress';
import { deepMemo } from '@hooks';
import { getCourseInfo } from '@apis';

const styles = {
    modal: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 650,
        bgcolor: 'background.paper',
        boxShadow: 24,
        p: 4,
        borderRadius: '0.35rem',
    },
    loading: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
};

const InfoModal = forwardRef(({}, ref) => {
    const [open, setOpen] = useState(false);
    const [courseId, setCourseId] = useState('');
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState({});

    useEffect(() => {
        if (courseId) {
            setLoading(true);
            getCourseInfo({
                course_id: courseId,
                onSuccess: (response) => {
                    console.log(response.data);
                    setInfo(response.data[0]);
                    setTimeout(() => {
                        setLoading(false);
                    }, 500);
                },
            });
        }
    }, [courseId]);

    const handleOpen = (value) => {
        setCourseId(value);
        setOpen(true);
    };
    const handleClose = () => setOpen(false);

    useImperativeHandle(ref, () => ({
        handleOpen,
    }));

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
        >
            <Box sx={styles.modal}>
                {loading ? (
                    <Box sx={styles.loading}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Typography
                            id='modal-modal-title'
                            variant='h6'
                            component='h2'
                            sx={{ fontWeight: 'bold' }}
                        >
                            {`${info.course_id}: ${info.course_name}`}
                        </Typography>
                        <Typography
                            id='modal-modal-description'
                            sx={{ mt: 2, textAlign: 'justify' }}
                        >
                            {info.course_description}
                        </Typography>
                    </>
                )}
            </Box>
        </Modal>
    );
});

export default deepMemo(InfoModal);
