import { useAppStore } from '../store/useAppStore';
import { CreditCard, History, AlertCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, role } = useAppStore();

  const isB2b = role === 'b2b';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-collier font-bold text-brand-verde-oscuro border-b pb-4">
          Un gusto verte de nuevo, {user.name}
        </h1>
        <p className="text-brand-verde-oscuro/60 font-amsi mt-2">
          {isB2b ? 'Panel de Distribuidor El Parián' : 'Panel de Cliente San Marcos Mascotas'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {isB2b ? (
          <>
            <div className="card-premium p-6 bg-white border-l-4 border-brand-verde-claro">
              <div className="flex items-center gap-3 mb-2 text-brand-verde-claro-oscuro">
                <CreditCard className="w-6 h-6" />
                <h3 className="font-collier font-bold text-lg">Crédito Disponible</h3>
              </div>
              <p className="text-3xl font-bold font-amsi text-brand-verde-oscuro">
                ${user.credit?.available?.toLocaleString() || '0'}
              </p>
              <p className="text-sm text-brand-verde-oscuro/60 mt-2 font-amsi">
                Deuda actual: ${user.credit?.currentDebt?.toLocaleString() || '0'}
              </p>
            </div>

            <div className="card-premium p-6 bg-white border-l-4 border-brand-naranja">
              <div className="flex items-center gap-3 mb-2 text-brand-verde-claro-oscuro">
                <History className="w-6 h-6" />
                <h3 className="font-collier font-bold text-lg">Vigencia</h3>
              </div>
              <p className="text-xl font-bold font-amsi text-brand-verde-oscuro">
                {user.credit?.validUntil || 'Sin Asignar'}
              </p>
            </div>

            <div className="card-premium p-6 bg-white border-l-4 border-brand-naranja">
              <div className="flex items-center gap-3 mb-2 text-brand-verde-claro-oscuro">
                <AlertCircle className="w-6 h-6" />
                <h3 className="font-collier font-bold text-lg">Estatus de Línea</h3>
              </div>
              <span className={`inline-flex items-center px-3 py-1 mt-1 rounded-full text-sm font-bold ${
                user.credit?.status === 'Activo' ? 'bg-brand-verde-claro/20 text-brand-verde-oscuro' : 
                user.credit?.status === 'Suspendido' ? 'bg-brand-rojo/10 text-brand-rojo' :
                'bg-yellow-100 text-brand-verde-oscuro'
              }`}>
                {user.credit?.status || 'Pendiente'}
              </span>
            </div>
          </>
        ) : (
          <div className="col-span-1 md:col-span-3 card-premium p-6 bg-brand-naranja text-white">
             <h3 className="font-collier font-bold text-xl mb-2">¡Gracias por ser parte de San Marcos!</h3>
             <p className="font-amsi opacity-90">El historial de tus pedidos estará disponible en una próxima actualización.</p>
          </div>
        )}
      </div>
{/* Future Phase 2 area */}
    </div>
  );
};

export default Dashboard;
