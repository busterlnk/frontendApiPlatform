import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function Home() {
  const [responseData, setResponseData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          'https://localhost/chatoperators',
          {
            headers: {
              'Content-Type': 'application/ld+json',
            },
          }
        );
        setResponseData(response.data['hydra:member']);
        console.log(responseData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Llamamos a fetchData() cuando haya cambios en formData
    fetchData();
  }, []);

  return (
    <div className="container mt-5">
    <h1>Prueba Api Platform</h1>
    {/* Mostramos la información */}
    {responseData.length > 0 && (
      <div>
        <h2>Información recibida:</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Login</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {responseData.map((item, index) => (
              <tr key={index}>
                <td>{item.operatorid}</td>
                <td>{item.vclogin}</td>
                <td>{item.vcemail}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )}
  </div>
  );
}