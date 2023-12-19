import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logout } from '../api/requests/agentRequest';
import axios from 'axios';


const Logout = () => {
    const navigate = useNavigate();

    useEffect(() => {
        logout().then(
            // localStorage.removeItem('token');
        );
        navigate('/login');
    }, [])
}

export default Logout;
