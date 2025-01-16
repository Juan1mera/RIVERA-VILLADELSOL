'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token'); // Recuperar el token

    if (!token) {
      router.push('/login'); // Redirigir si no hay token
      return;
    }

    axios.get('http://localhost:4000/api/propietarios', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      setData(response.data);
      setLoading(false);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
  }, [router]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold">Sistema Administrativo Villa del Sol</h1>
      <ul>
        {data.map((propietario) => (
          <li key={propietario.id}>{propietario.nombre}</li>
        ))}
      </ul>
    </div>
  );
}
