import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { login, fetchUser } from '../api/requests/agentRequest';
import { decodeToken } from "../api/requests/tokenAuth";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const [loginError, setLoginError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    login(formData).then(
      (response) => {
        setFormData({
          username: '',
          password: '',
        });
        // console.log(response)
        setLoginError(false);
        // const decodedToken = decodeToken(response);
        // console.log(decodedToken);
        fetchUser(response).then(
          (response2) => {
            console.log(response2)
          }
        );
      }
    )
  };

  const handleLogout = (e) =>{
      e.preventDefault();

      try {
        const response = axios.post(
          'https://localhost/logout'
        );

        // const userIri = response.headers.get('Location');
        return response;


      } catch (error) {
        console.log(error.response.data);
      }
  }

  return (
    <div className="container mt-5">
        <button className="btn btn-primary">
          <Link to="/" className="text-white text-decoration-none">Home</Link>
        </button>
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre de Usuario:
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {loginError && (
          <div className="alert alert-danger" role="alert">
            Error al iniciar sesión. Verifica tus credenciales.
          </div>
        )}

        <button type="submit" className="btn btn-primary">
          Iniciar Sesión
        </button>

      </form>
      <button type="submit" onClick={handleLogout} className="btn btn-primary">
          Salir de la sesion
        </button>
    </div>
  );
};

export default LoginForm;
