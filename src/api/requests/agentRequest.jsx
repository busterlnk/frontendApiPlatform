import axios from "axios";
import jwt from 'jsonwebtoken';

export const login = async (formData) => {
    try {
        const response = await axios.post(
          'https://localhost/login',formData,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        // const userIri = response.headers.get('X-Location');
        // const userIri = response.headers.get('Link');
        localStorage.setItem("token", response.data.token);
        console.log(response.data);
        return response.data.token;
        // return userIri;


      } catch (error) {
        console.log(error.response);
      }
}


export const fetchUser = async (authToken) => {
    try {

        const response = await axios.get(
          // 'https://localhost/auth',
            'https://localhost'+authToken,
            {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
          }
        );

        // const userIri = response.headers.get('Location');
        return response.data;
      } catch (error) {
        console.log(error.response.data);
      }
}

export const logout = () => {
    try{
        // const response = axios.post(
        //     'https://localhost/logout', null,{
        //         Authorization: 'Bearer '+ localStorage.getItem('token')
        //     }
        // )

    }catch(error) {
        console.log(error.response.data);
    }
}
