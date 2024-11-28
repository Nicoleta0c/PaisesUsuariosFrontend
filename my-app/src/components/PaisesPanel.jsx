import { useState, useEffect } from 'react';

export default function PaisesPanel() {
  const [paises, setPaises] = useState([]);
  const [nuevoPais, setNuevoPais] = useState({ id: 0, nombre: '', gentilicio: '', capital: '', estatus: true });
  const [editandoPais, setEditandoPais] = useState(null);

  useEffect(() => {
    obtenerPaises();
  }, []);

  const obtenerPaises = async () => {
    const response = await fetch('https://localhost:7174/api/pais');
    const data = await response.json();
    setPaises(data);
  };

  const crearPais = async () => {
    const response = await fetch('https://localhost:7174/api/pais', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nuevoPais),
    });

    const nuevoPaisCreado = await response.json();
    setPaises([...paises, nuevoPaisCreado]);
    setNuevoPais({ id: 0, nombre: '', gentilicio: '', capital: '', estatus: true }); 
  };

  const actualizarPais = async () => {
    const response = await fetch(`https://localhost:7174/api/pais/${editandoPais.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(editandoPais),
    });

    const paisActualizado = await response.json();
    setPaises(paises.map(p => (p.id === paisActualizado.id ? paisActualizado : p)));
    setEditandoPais(null);
  };

  const eliminarPais = async (id) => {
    await fetch(`https://localhost:7174/api/pais/${id}`, {
      method: 'DELETE',
    });
    setPaises(paises.filter(p => p.id !== id));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6">
      <h2 className="text-2xl font-bold my-6">Gestion de Paises</h2>
      <div className="mb-4 flex space-x-4 ">
        <input 
          type="text" 
          placeholder="Nombre del pais" 
          value={editandoPais ? editandoPais.nombre || '' : nuevoPais.nombre}
          onChange={(e) => editandoPais 
            ? setEditandoPais({...editandoPais, nombre: e.target.value})
            : setNuevoPais({...nuevoPais, nombre: e.target.value})
          }
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow"
        />
        <input 
          type="text" 
          placeholder="Gentilicio" 
          value={editandoPais ? editandoPais.gentilicio || '' : nuevoPais.gentilicio}
          onChange={(e) => editandoPais
            ? setEditandoPais({...editandoPais, gentilicio: e.target.value})
            : setNuevoPais({...nuevoPais, gentilicio: e.target.value})
          }
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
        />
        <input 
          type="text" 
          placeholder="Capital" 
          value={editandoPais ? editandoPais.capital || '' : nuevoPais.capital}
          onChange={(e) => editandoPais
            ? setEditandoPais({...editandoPais, capital: e.target.value})
            : setNuevoPais({...nuevoPais, capital: e.target.value})
          }
          className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-24"
        />
        {editandoPais ? (
          <button onClick={actualizarPais} className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md transition-colors">
            Actualizar
          </button>
        ) : (
          <button onClick={crearPais} className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors">
            Crear
          </button>
        )}
      </div>
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nombre</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gentilicio</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Capital</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Acciones</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {paises.map((pais) => (
            <tr key={pais.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">{pais.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pais.nombre}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pais.gentilicio}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pais.capital}</td>
              <td className="px-6 py-4 whitespace-nowrap">{pais.estatus ? 'Activo' : 'Inactivo'}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <button className="text-blue-600 hover:text-blue-800 mr-2" onClick={() => setEditandoPais(pais)}>
                  Editar
                </button>
                <button className="text-red-600 hover:text-red-800" onClick={() => eliminarPais(pais.id)}>
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
