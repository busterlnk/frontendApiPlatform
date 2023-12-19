import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useParams, useNavigate, Link } from 'react-router-dom';


const EditUserForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    plainPassword: '',
  });

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://localhost/users/${id}`,
          {
            headers: {
              'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem('token')}`
            },
          }
        );
        setFormData(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llamamos a fetchData() cuando haya cambios en formData
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name !== 'confirmPassword') {
      setFormData({
        ...formData,
        [name]: value,
      });
    } else {
      setConfirmPassword(value);
    }
  };


    const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    if (formData.plainPassword === confirmPassword) {
        console.log('Datos del usuario:', formData);
        const response = await axios.patch(
        `https://localhost/users/${id}`,formData, {
            headers: {
            'Content-Type': 'application/merge-patch+json',
            Authorization: `Bearer ${localStorage.getItem('token')}`
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
        alert('Usuario editado')
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
        <h2>Editar Usuario</h2>
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
            type="Password"
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
            value={formData.confirmPassword}
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

export default EditUserForm;
