import React from "react";
import { FunnelIcon, AdjustmentsHorizontalIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Filters() {
  const [activeFilters, setActiveFilters] = React.useState(["Tecnología", "Recientes"]);

  const removeFilter = (filterToRemove) => {
    setActiveFilters(activeFilters.filter(filter => filter !== filterToRemove));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-slate-800">Filtros</h1>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <FunnelIcon className="h-5 w-5 inline mr-1" />
          Nuevo Filtro
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Filtros Activos</h2>
          {activeFilters.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <span 
                  key={filter}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm"
                >
                  {filter}
                  <button 
                    onClick={() => removeFilter(filter)}
                    className="ml-1.5 text-blue-600 hover:text-blue-900"
                  >
                    <XMarkIcon className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          ) : (
            <p className="text-slate-500">No hay filtros activos</p>
          )}
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-800 mb-3">Configurar Filtros</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-slate-500 mr-2" />
                <h3 className="font-medium text-slate-700">Filtrar por Categoría</h3>
              </div>
              {/* Aquí irían los checkboxes de categorías */}
            </div>

            <div className="space-y-4">
              <div className="flex items-center">
                <AdjustmentsHorizontalIcon className="h-5 w-5 text-slate-500 mr-2" />
                <h3 className="font-medium text-slate-700">Filtrar por Fecha</h3>
              </div>
              {/* Aquí irían los controles de fecha */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}