import { useState, useEffect } from 'react';

export default function UsuariosPanel() {
  const [usuarios, setUsuarios] = useState([]);
  const [nuevoUsuario, setNuevoUsuario] = useState({ nombre: '', correo: '', clave: '', estatus: true });
  const [editandoUsuario, setEditandoUsuario] = useState(null);

  useEffect(() => {
    obtenerUsuarios();
  }, []);

  const obtenerUsuarios = async () => {
    const response = await fetch('https://localhost:7174/api/usuario/obtener');
    const data = await response.json();
    setUsuarios(data);
  };

  const crearUsuario = async () => {
    if (!nuevoUsuario.nombre || !nuevoUsuario.correo || !nuevoUsuario.clave) {
      console.error('Por favor llena todos los campos requeridos');
      return;
    }

    const response = await fetch('https://localhost:7174/api/usuario/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        nombre: nuevoUsuario.nombre,
        correo: nuevoUsuario.correo,
        clave: nuevoUsuario.clave,
        estatus: nuevoUsuario.estatus
      }),
    });

    if (response.ok) {
      const usuarioCreado = await response.json();
      setUsuarios([...usuarios, usuarioCreado]);
      setNuevoUsuario({ nombre: '', correo: '', clave: '', estatus: true });
    } else {
      const errorText = await response.text();
      console.error('Error al crear usuario:', errorText);
    }
  };

  const actualizarUsuario = async () => {
    const response = await fetch(`https://localhost:7174/api/usuario/actualizar/${editandoUsuario.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editandoUsuario),
    });

    if (response.ok) {
      const usuarioActualizado = await response.json();
      setUsuarios(usuarios.map(u => (u.id === usuarioActualizado.id ? usuarioActualizado : u)));
      setEditandoUsuario(null);
    } else {
      console.error('Error al actualizar usuario');
    }
  };

  const eliminarUsuario = async (id) => {
    const response = await fetch(`https://localhost:7174/api/usuario/eliminar/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setUsuarios(usuarios.filter(u => u.id !== id));
    } else {
      console.error('Error al eliminar usuario');
    }
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-bold my-6">Gestion de Usuarios</h2>
      <div className="mb-4 flex space-x-4">
        {editandoUsuario && (
          <div className="flex items-center">
            <span className="mr-2">Editando ID: {editandoUsuario.id}</span>
          </div>
        )}
        <input 
          type="text" 
          placeholder="Nombre" 
          value={editandoUsuario ? editandoUsuario.nombre || '' : nuevoUsuario.nombre}
          onChange={(e) => editandoUsuario 
            ? setEditandoUsuario({...editandoUsuario, nombre: e.target.value})
            : setNuevoUsuario({...nuevoUsuario, nombre: e.target.value})
          }
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        <input 
          type="email" 
          placeholder="Correo" 
          value={editandoUsuario ? editandoUsuario.correo || '' : nuevoUsuario.correo}
          onChange={(e) => editandoUsuario 
            ? setEditandoUsuario({...editandoUsuario, correo: e.target.value})
            : setNuevoUsuario({...nuevoUsuario, correo: e.target.value})
          }
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        <input 
          type="password" 
          placeholder="Contraseña" 
          value={editandoUsuario ? editandoUsuario.clave || '' : nuevoUsuario.clave}
          onChange={(e) => editandoUsuario 
            ? setEditandoUsuario({...editandoUsuario, clave: e.target.value})
            : setNuevoUsuario({...nuevoUsuario, clave: e.target.value})
          }
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        {editandoUsuario ? (
          <button onClick={actualizarUsuario} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors">
            Actualizar
          </button>
        ) : (
          <button onClick={crearUsuario} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
            Crear
          </button>
        )}
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Correo</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {usuarios.map((usuario) => (
            <tr key={usuario.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{usuario.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{usuario.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{usuario.correo}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => setEditandoUsuario(usuario)}>
                  Editar
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={() => eliminarUsuario(usuario.id)}>
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
