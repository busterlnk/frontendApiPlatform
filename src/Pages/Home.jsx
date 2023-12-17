import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null);
  // axios.defaults.withCredentials = true;


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://localhost/users',
          {
            headers: {
              'Content-Type': 'application/ld+json',
            },
          }
        );
        setResponseData(response.data['hydra:member']);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llamamos a fetchData() cuando haya cambios en formData
    fetchData();
  }, []);

  // const handleEdit = async (e) => {

  // };

  
  const routeChange = (e) =>{ 
    navigate('/edit/'+e.target.value);
  }


  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.delete(
        'https://localhost/users/'+e.target.value,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      navigate('/');
    } catch (error) {
    }
  };


  return (
    <div className="container mt-5">
        <button className="btn btn-primary">
          <Link to="/register" className="text-white text-decoration-none">Sign Up</Link>
        </button>

        <button className="btn btn-primary mr-2">
          <Link to="/login" className="text-white text-decoration-none">Login</Link>
        </button>
    <h1>Prueba Api Platform</h1>
    {/* Mostramos la información */}
    {responseData && responseData.length > 0 && (
      <div>
        <h2>Información recibida:</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Email</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td><button className="btn btn-primary mr-2 ml-2" type='submit' onClick={routeChange} value={item.id}>Editar</button></td>
                <td><button className="btn btn-primary mr-2 ml-2" type='submit' onClick={handleDelete} value={item.id}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
}