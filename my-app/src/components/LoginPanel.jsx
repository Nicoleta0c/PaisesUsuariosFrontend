import { useState } from 'react';

export default function LoginPanel({ onLoginSuccess }) {
  const [credenciales, setCredenciales] = useState({ correo: '', clave: '' });

  const iniciarSesion = async () => {
    if (!credenciales.correo || !credenciales.clave) {
      console.error('Por favor, completa todos los campos.');
      return;
    }

    const response = await fetch('https://localhost:7174/api/usuario/login-usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credenciales),
    });

    if (response.ok) {
      console.log('Inicio de sesión exitoso');
      setCredenciales({ correo: '', clave: '' });
      onLoginSuccess();
    } else {
      const errorData = await response.json();
      console.error('Error al iniciar sesión:', errorData);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold text-blue-800">Iniciar Sesión</h2>
      <form onSubmit={(e) => { e.preventDefault(); iniciarSesion(); }} className="space-y-4">
        <input 
          type="email" 
          placeholder="Correo electrónico" 
          value={credenciales.correo}
          onChange={(e) => setCredenciales({...credenciales, correo: e.target.value})}
          className="border border-blue-200 focus:border-blue-400 w-full p-2 rounded"
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={credenciales.clave}
          onChange={(e) => setCredenciales({...credenciales, clave: e.target.value})}
          className="border border-blue-200 focus:border-blue-400 w-full p-2 rounded"
        />
        <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white p-2 rounded">
          Iniciar Sesión
        </button>
      </form>
    </div>
  );
}
