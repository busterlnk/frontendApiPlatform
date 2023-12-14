import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    vclogin: '',
    vcpassword: '',
  });

  const [loginError, setLoginError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'https://localhost/login',formData,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(response.data)

      setFormData({
        vclogin: '',
        vcpassword: '',
      });

      setLoginError(false);
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setLoginError(true);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="vclogin" className="form-label">
            Nombre de Usuario:
          </label>
          <input
            type="text"
            className="form-control"
            id="vclogin"
            name="vclogin"
            value={formData.vclogin}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="vcpassword" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="vcpassword"
            name="vcpassword"
            value={formData.vcpassword}
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
    </div>
  );
};

export default LoginForm;
