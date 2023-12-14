import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';


const CreateUserForm = () => {
  const [formData, setFormData] = useState({
    vclogin: '',
    vcemail: '',
    vcpassword: ''
  });

  const [confirmPassword, setConfirmPassword] = useState('');

  const [passwordMatch, setPasswordMatch] = useState(true);


  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    
    if(name != 'confirmPassword'){
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
    if (formData.vcpassword === confirmPassword) {
      console.log('Datos del usuario:', formData);
      const response = await axios.post(
        'https://localhost/chatoperators',formData,
        {
          headers: {
            'Content-Type': 'application/ld+json',
          },
        }
      );
      console.log(response);
      setFormData({
        vclogin: '',
        vcemail: '',
        vcpassword: ''
      });
      setConfirmPassword('');
      setPasswordMatch(true);
    } else {
      setPasswordMatch(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Registro de Usuario</h2>
      <form onSubmit={handleSubmit}>
        
        <div className="mb-3">
          <label htmlFor="vcemail" className="form-label">
            Correo Electrónico:
          </label>
          <input
            type="vcemail"
            className="form-control"
            id="vcemail"
            name="vcemail"
            value={formData.vcemail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="vclogin" className="form-label">
            Nombre:
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

export default CreateUserForm;
