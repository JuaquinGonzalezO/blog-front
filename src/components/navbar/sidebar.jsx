import React from "react";
import { 
  HomeIcon, 
  NewspaperIcon,
  AcademicCapIcon,
  ChevronLeftIcon,
  Bars3Icon,
  Cog6ToothIcon
} from "@heroicons/react/24/outline";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const navItems = [
  { text: "Inicio", icon: <HomeIcon className="h-5 w-5" />, path: "/" },
  { text: "Artículos", icon: <NewspaperIcon className="h-5 w-5" />, path: "/post" },
  { text: "Cursos", icon: <AcademicCapIcon className="h-5 w-5" />, path: "/cursos" },
  { text: "Filtros", icon: <Bars3Icon className="h-5 w-5" />, path: "/filters" },
];

const systemItems = [
  { text: "Configuración", icon: <Cog6ToothIcon className="h-5 w-5" />, path: "/settings" }
];

export default function Sidebar() {
  const [open, setOpen] = React.useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans">
      {/* Sidebar */}
      <div 
        className={`bg-slate-800 text-slate-200 transition-all duration-300 ease-in-out 
          ${open ? "w-64" : "w-20"} flex flex-col border-r border-slate-700`}
      >
        {/* Logo/Sidebar Header */}
        <div className="flex items-center justify-between p-4 h-16 border-b border-slate-700">
          {open && (
            <h1 className="text-xl font-semibold whitespace-nowrap text-white">
              <span className="text-blue-400">Educa</span>Platform
            </h1>
          )}
          <button
            onClick={toggleDrawer}
            className="p-1.5 rounded-md hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            {open ? (
              <ChevronLeftIcon className="h-5 w-5" />
            ) : (
              <Bars3Icon className="h-5 w-5" />
            )}
          </button>
        </div>
        
        {/* Main Navigation */}
        <nav className="flex-1 p-2 overflow-y-auto">
          <div className="mb-6">
            <h3 className={`text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ${!open && "hidden"}`}>
              Contenido
            </h3>
            <ul>
              {navItems.map(({ text, icon, path }) => (
                <li key={text}>
                  <button
                    onClick={() => navigate(path)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 mb-1
                      ${location.pathname === path 
                        ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-400" 
                        : "hover:bg-slate-700/50 text-slate-300 hover:text-white"}
                      ${open ? "justify-start" : "justify-center"}`}
                  >
                    <span className={`flex items-center ${open ? "mr-3" : ""}`}>
                      {React.cloneElement(icon, {
                        className: `h-5 w-5 ${location.pathname === path ? "text-blue-400" : "text-slate-400"}`
                      })}
                    </span>
                    {open && (
                      <span className="font-medium whitespace-nowrap">
                        {text}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* System Navigation */}
          <div>
            <h3 className={`text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 ${!open && "hidden"}`}>
              Sistema
            </h3>
            <ul>
              {systemItems.map(({ text, icon, path }) => (
                <li key={text}>
                  <button
                    onClick={() => navigate(path)}
                    className={`w-full flex items-center p-3 rounded-lg transition-all duration-200 mb-1
                      ${location.pathname === path 
                        ? "bg-blue-600/20 text-blue-400 border-l-2 border-blue-400" 
                        : "hover:bg-slate-700/50 text-slate-300 hover:text-white"}
                      ${open ? "justify-start" : "justify-center"}`}
                  >
                    <span className={`flex items-center ${open ? "mr-3" : ""}`}>
                      {React.cloneElement(icon, {
                        className: `h-5 w-5 ${location.pathname === path ? "text-blue-400" : "text-slate-400"}`
                      })}
                    </span>
                    {open && (
                      <span className="font-medium whitespace-nowrap">
                        {text}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm h-16 flex items-center px-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-800">
            {location.pathname === "/" && "Inicio"}
            {location.pathname === "/post" && "Artículos"}
            {location.pathname === "/courses" && "Cursos"}
            {location.pathname === "/filters" && "Filtros"}
            {location.pathname === "/settings" && "Configuración"}
          </h2>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50">
          <div className="max-w-7xl mx-auto p-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}