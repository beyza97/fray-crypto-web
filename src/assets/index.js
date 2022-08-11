import 'react-app-polyfill/ie11';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import AppWrapper from './AppWrapper';
import { AuthProvider } from './context/AuthContext';


ReactDOM.render(
    <BrowserRouter>
        <AuthProvider>
            <AppWrapper></AppWrapper>
        </AuthProvider>
    </BrowserRouter>,
    document.getElementById('root')
);

