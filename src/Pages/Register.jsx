import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';


const CreateUserForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    plainPassword: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordMatch, setPasswordMatch] = useState(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if(name !== 'confirmPassword'){
      setFormData({
        ...formData,
        [name]: value,
      });
    }else {
      setConfirmPassword(value)
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.plainPassword === confirmPassword) {
      console.log('Datos del usuario:', formData);
      const response = await axios.post(
        'https://localhost/users',formData,
        {
          headers: {
            'Content-Type': 'application/ld+json',
          },
        }
      );
      console.log(response);
      setFormData({
        username: '',
        email: '',
        plainPassword: ''
      });
      setConfirmPassword('');
      setPasswordMatch(true);
      navigate('/');
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div className="container mt-5">
        <button className="btn btn-primary">
          <Link to="/" className="text-white text-decoration-none">Home</Link>
        </button>
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Nombre:
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
          <label htmlFor="plainPassword" className="form-label">
            Contraseña:
          </label>
          <input
            type="password"
            className="form-control"
            id="plainPassword"
            name="plainPassword"
            value={formData.plainPassword}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirmar Contraseña:
          </label>
          <input
            type="password"
            className={`form-control ${passwordMatch ? '' : 'is-invalid'}`}
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            required
          />
          {!passwordMatch && (
            <div className="invalid-feedback">Las contraseñas no coinciden.</div>
          )}
        </div>

        <button type="submit" className="btn btn-primary">
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default CreateUserForm;
