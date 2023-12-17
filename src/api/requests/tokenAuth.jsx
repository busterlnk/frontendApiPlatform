import React from 'react';
import jwt from "jsonwebtoken";



export const decodeToken = (token) => {
    try {
        console.log(token);
        const decodedToken = jwt.verify(token, 'your-secret-key'); // Reemplaza 'your-secret-key' con tu clave secreta

        return decodedToken;
    } catch (error) {
        console.error('Error decoding token:', error.message);
        return null;
    }
};
