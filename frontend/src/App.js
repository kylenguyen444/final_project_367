import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CProvider } from '@components/Context';
import Login from '@pages/Login';
import Homepage from '@pages/Homepage';
import context from '@constants/context';
import { deepMemo } from '@hooks';
import { getGradRequirement } from '@apis';

const App = () => {
    const [contextValue, setContextValue] = useState(context);

    useEffect(() => {
        getGradRequirement({
            onSuccess: (res) => {
                setContextValue({
                    ...contextValue,
                    gradRequirement: res.data,
                });
            },
        });
    }, []);

    useEffect(() => {
        console.log('contextValue changed!', contextValue);
    }, [contextValue]);

    const updateContextValue = (value) => {
        setContextValue(value);
    };

    return (
        <CProvider value={{ contextValue, updateContextValue }}>
            <BrowserRouter>
                <Routes>
                    <Route key='/' path='/' element={<Login />} />
                    <Route key='/home' path='/home' element={<Homepage />} />
                </Routes>
            </BrowserRouter>
        </CProvider>
    );
};

export default deepMemo(App);
