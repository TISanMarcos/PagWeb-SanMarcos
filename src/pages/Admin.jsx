import { useState, useEffect } from 'react';

const Admin = () => {
  const [users, setUsers] = useState([]);
  const [activeTab, setActiveTab] = useState('clients'); // 'clients' | 'products'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const res = await fetch('/api/clients');
        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        }
      } catch (err) {
        console.error("Error fetching clients", err);
      } finally {
        setLoading(false);
      }
    };
    loadClients();
  }, []);

  const handleUpdateCredit = async (uid, updateField, value) => {
    try {
      const res = await fetch(`/api/clients/${uid}/credit`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ updateField, value })
      });
      if (res.ok) {
        const updatedUser = await res.json();
        setUsers(users.map(u => u.uid === uid ? updatedUser : u));
      }
    } catch (err) {
      console.error("Error updating credit", err);
    }
  };

  if (loading) return <div className="p-12 text-center text-gray-500 font-nunito">Cargando panel...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-comfortaa font-bold text-gray-900 mb-8 border-b pb-4">
        Panel de Administración Global (Conectado a Backend)
      </h1>

      <div className="flex gap-4 mb-8 border-b border-gray-200">
        <button 
          onClick={() => setActiveTab('clients')}
          className={`py-2 px-4 font-bold ${activeTab === 'clients' ? 'text-brand-terracota border-b-2 border-brand-terracota' : 'text-gray-500'}`}
        >
          Gestión de Clientes y Créditos
        </button>
        <button 
          onClick={() => setActiveTab('products')}
          className={`py-2 px-4 font-bold ${activeTab === 'products' ? 'text-brand-terracota border-b-2 border-brand-terracota' : 'text-gray-500'}`}
        >
          Gestión de Productos
        </button>
      </div>

      {activeTab === 'clients' && (
        <div className="bg-white rounded-xl shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente/Rol</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Asignado</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Disponible</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estatus</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200 font-nunito text-sm">
              {users.map(user => (
                <tr key={user.uid}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-bold text-gray-900">{user.name}</div>
                    <div className="text-gray-500 text-xs">{user.email} - ({user.role.toUpperCase()})</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {user.role === 'b2b' ? (
                       <input 
                         type="number" 
                         value={user.credit?.allocated || 0}
                         onChange={(e) => handleUpdateCredit(user.uid, 'allocated', Number(e.target.value))}
                         className="border px-2 py-1 rounded w-24 text-gray-800"
                       />
                    ) : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-800 font-bold">
                    {user.role === 'b2b' ? `$${user.credit?.available?.toLocaleString()}` : 'N/A'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                  {user.role === 'b2b' ? (
                       <select 
                         value={user.credit?.status || 'Pendiente'}
                         onChange={(e) => handleUpdateCredit(user.uid, 'status', e.target.value)}
                         className="border px-2 py-1 rounded text-gray-800"
                       >
                         <option value="Activo">Activo</option>
                         <option value="Vencido">Vencido</option>
                         <option value="Suspendido">Suspendido</option>
                         <option value="Pendiente">Pendiente</option>
                       </select>
                    ) : 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'products' && (
        <div className="bg-white rounded-xl shadow overflow-hidden p-6 text-center text-gray-500 font-nunito">
           <p>Módulo de altas/bajas de productos apuntando a AWS API Fase 2.</p>
           <p>En construcción pendiente equipo de infraestructura.</p>
        </div>
      )}
    </div>
  );
};

export default Admin;
