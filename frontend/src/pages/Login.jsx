import React, { useState, useRef, useContext } from 'react';

import { useNavigate } from 'react-router-dom';
import Context from '@components/Context';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';

import PasswordField from '@components/PasswordField';

import { makeStyles } from '@mui/styles';
import { createTheme } from '@mui/material/styles';
import images from '@assets';
import colors from '@colors';
import { deepMemo } from '@hooks';
import { postStudentLogin, postStudentProfile } from '@apis';

const theme = createTheme();

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
        backgroundImage: `url(${images.middle_college})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
    },
    loginContainer: {
        display: 'block',
        position: 'fixed',
        right: theme.spacing(8),
        padding: theme.spacing(4),
        borderRadius: theme.spacing(1),
        backgroundColor: colors.primary,
        justifyContent: 'center',
        textAlign: 'center',
    },
});

const styles = {
    formContainer: {
        marginTop: '0rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        '& .MuiTextField-root': {
            m: 1,
            width: '30ch',
            marginTop: '1rem',
        },
    },
};

const Login = ({}) => {
    const classes = useStyles();
    const { contextValue, updateContextValue } = useContext(Context);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [text, setText] = useState('');

    const navigate = useNavigate();
    const passwordRef = useRef(null);

    const handleChangeEmail = (event) => setEmail(event.target.value);
    const handleSubmit = () => {
        const password = passwordRef.current.getPassword();
        if (password.length < 6) {
            setText('Password must be at least 6 characters');
            return;
        }
        setLoading(true);
        postStudentLogin({
            stu_email: email,
            stu_password: password,
            onSuccess: (response) => {
                setLoading(false);
                setText('Log in successfully!');
                setTimeout(() => {
                    navigate('/home', { replace: true });
                }, 500);
                postStudentProfile({
                    stu_email: email,
                    onSuccess: (res) => {
                        updateContextValue({
                            ...contextValue,
                            isLoggedIn: true,
                            studentProfile: res.data,
                        });
                        setTimeout(() => {
                            navigate('/home', { replace: true });
                        }, 500);
                    },
                });
            },
            onError: () => {
                setTimeout(() => {
                    setLoading(false);
                    setText('Your email or password is wrong! Try again!');
                }, 300);
            },
        });
    };

    return (
        <div className={classes.root}>
            <div className={classes.loginContainer}>
                <Typography align='center' color={colors.white} variant='h4'>
                    LOG IN
                </Typography>
                <Box
                    component='form'
                    sx={styles.formContainer}
                    noValidate
                    autoComplete='off'
                >
                    <TextField
                        sx={{
                            backgroundColor: 'white',
                            borderRadius: '0.5rem',
                        }}
                        autoComplete='off'
                        required
                        id='outlined-password-input'
                        label='Email'
                        type='email'
                        value={email}
                        onChange={handleChangeEmail}
                    />
                    <PasswordField ref={passwordRef} label='Password' />
                    <Typography
                        style={{ fontWeight: 600 }}
                        variant='p'
                        align='center'
                        color={colors.white}
                    >
                        {text}
                    </Typography>
                    <LoadingButton
                        onClick={handleSubmit}
                        loading={loading}
                        variant='contained'
                        sx={{
                            marginTop: '0.5rem',
                            background: colors.white,
                            color: colors.primary,
                            fontSize: '22px',
                            padding: '0.25rem 1.5rem',
                            '&:hover': {
                                background: colors.white,
                                color: colors.primary,
                            },
                        }}
                    >
                        Log in
                    </LoadingButton>
                </Box>
            </div>
        </div>
    );
};

export default deepMemo(Login);
