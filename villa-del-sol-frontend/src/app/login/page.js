'use client';

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      setError('Por favor complete todos los campos.');
      return;
    }

    setIsLoading(true);

    try {
      console.log("Enviando datos de login:", formData);
      const response = await axios.post('http://localhost:4000/api/auth/login', {
        email: formData.email.trim(),  // Asegúrate de limpiar espacios antes de enviar
        password: formData.password.trim(),  // Asegúrate de limpiar espacios antes de enviar
      });

      console.log("Respuesta del servidor:", response.data);

      if (response.data.data.token) {
        localStorage.setItem('token', response.data.data.token);
        router.push('/');
      } else {
        setError('No se pudo iniciar sesión. Por favor intente nuevamente.');
      }
    } catch (err) {
      console.error("Error en el login:", err);

      if (err.response) {
        if (err.response.status === 401) {
          setError('Correo o contraseña incorrectos.');
        } else {
          setError('Error en el servidor. Por favor intente más tarde.');
        }
      } else if (err.request) {
        setError('No se pudo conectar con el servidor. Verifique su conexión a internet.');
      } else {
        setError('Error al procesar la solicitud.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <form onSubmit={handleSubmit}>
          <h1 className="text-2xl font-bold mb-4">Iniciar Sesión</h1>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 mb-2">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:border-blue-500"
              required
            />
          </div>

          <button
            type="submit"
            className={`w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 
              ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link href="/register" className="text-blue-500 hover:underline">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
