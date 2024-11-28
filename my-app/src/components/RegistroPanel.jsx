import { useState } from 'react';

export default function RegistroPanel() {
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', correo: '', clave: '', confirmarClave: '' });

  const registrarUsuario = async () => {
    if (nuevoUsuario.clave !== nuevoUsuario.confirmarClave) {
      console.error('Las contraseñas no coinciden');
      return;
    }

    const response = await fetch('https://localhost:7174/api/usuario/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        Nombre: nuevoUsuario.nombre, 
        Correo: nuevoUsuario.correo, 
        Clave: nuevoUsuario.clave 
      }),
    });

    if (response.ok) {
      console.log('Usuario registrado');
      setNuevoUsuario({ nombre: '', correo: '', clave: '', confirmarClave: '' });
    } else {
      const error = await response.text();
      console.error('Error al registrar usuario:', error);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-2xl font-semibold text-blue-800">Registro de Usuario</h2>
      <form onSubmit={(e) => { e.preventDefault(); registrarUsuario(); }} className="space-y-4">
        <input 
          type="text" 
          placeholder="Nombre" 
          value={nuevoUsuario.nombre}
          onChange={(e) => setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})}
          className="border border-blue-200 focus:border-blue-400 w-full p-2 rounded"
          required
        />
        <input 
          type="email" 
          placeholder="Correo electronico" 
          value={nuevoUsuario.correo}
          onChange={(e) => setNuevoUsuario({...nuevoUsuario, correo: e.target.value})}
          className="border border-blue-200 focus:border-blue-400 w-full p-2 rounded"
          required
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={nuevoUsuario.clave}
          onChange={(e) => setNuevoUsuario({...nuevoUsuario, clave: e.target.value})}
          className="border border-blue-200 focus:border-blue-400 w-full p-2 rounded"
          required
        />
        <input 
          type="password" 
          placeholder="Confirmar contraseña" 
          value={nuevoUsuario.confirmarClave}
          onChange={(e) => setNuevoUsuario({...nuevoUsuario, confirmarClave: e.target.value})}
          className="border border-blue-200 focus:border-blue-400 w-full p-2 rounded"
          required
        />
        <button type="submit" className="w-full bg-green-500 hover:bg-green-600 text-white p-2 rounded">
          Registrarse
        </button>
      </form>
    </div>
  );
}
