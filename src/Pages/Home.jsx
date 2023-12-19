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
                Authorization: 'Bearer '+ localStorage.getItem('token'),
                'Content-Type': 'application/ld+json'
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

    const handleLogout = (e) => {
        e.preventDefault();
        try {
            // const response = axios.post(
            //   'https://localhost/logout', null ,
            //     {
            //         headers: {
            //             Authorization: 'Bearer '+ localStorage.getItem('token'),
            //         },
            //     }
            // );
            localStorage.removeItem('token');
            navigate('/')
            // const userIri = response.headers.get('Location');
            // return response;


        } catch (error) {
            console.log(error.response.data);
        }
    }
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
              // Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MDI5MDU2NzUsImV4cCI6MTcwMjkwOTI3NSwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiYWxmYXJvIn0.VXM-sm0YZpxRPyVvUjhv4uABv_BQEauI3Zb5d2P9R-WvxsaSRG70a2TBiC5SjP9WPpkWt5TeILUDkNJyz4Eec8UCb_C0Kaip7l4ZK4qdxUy3AnMGjX2M5XSTMZUIaqTs0tHCeE4iVGlI10k8WxbhYNYjdbL1n5lWGn3k8JHiy4EO4WxzmCfaYdaw3l47ZDRPeEcO855ondLkbMuKwEgkVMM1A8n0Tl4Dlf4PqJ8Nx5r6S5T7eD2HLPcTvvqWtHLDX03Wm0Q4I0ZIb__QrsaXJP9GM9tP5l-ZX8aizUl9o-zLUDbliuTUTyIHSWa27hwS-3-mYb442HnZxXavHDseeQ',
          },
        }
      );
      navigate('/');
    } catch (error) {
    }
  };


  return (
    <div className="container mt-5">
        {!localStorage.getItem('token') ?
        <div>
            <button className="btn btn-primary">
              <Link to="/register" className="text-white text-decoration-none">Sign Up</Link>
            </button>
            <button className="btn btn-primary mr-2">
              <Link to="/login" className="text-white text-decoration-none">Login</Link>
            </button>
        </div>
        :
        <button type="submit" onClick={handleLogout} className="btn btn-primary">
            Salir de la sesion
        </button>
        }
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
