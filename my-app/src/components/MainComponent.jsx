import { useState } from 'react';
import { Users, Globe, UserPlus, LogIn } from 'lucide-react';
import PaisesPanel from './PaisesPanel';
import UsuariosPanel from './UsuariosPanel';
import RegistroPanel from './RegistroPanel';
import LoginPanel from './LoginPanel';

export default function MainComponent() {
  const [activeTab, setActiveTab] = useState("login");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setActiveTab("paises"); 
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      <header className="sticky top-0 z-10 backdrop-blur-md bg-white/80 border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <nav>
            <div className="flex space-x-2">
              {isAuthenticated ? (
                [
                  { id: "paises", icon: Globe, label: "Paises" },
                  { id: "usuarios", icon: Users, label: "Usuarios" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))
              ) : (
               
                [
                  { id: "registro", icon: UserPlus, label: "Registro" },
                  { id: "login", icon: LogIn, label: "Login" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                      activeTab === tab.id
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    <tab.icon className="h-4 w-4" />
                    <span>{tab.label}</span>
                  </button>
                ))
              )}
            </div>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        {activeTab === "paises" && isAuthenticated && <PaisesPanel />}
        {activeTab === "usuarios" && isAuthenticated && <UsuariosPanel />}
        {activeTab === "registro" && !isAuthenticated && <RegistroPanel />}
        {activeTab === "login" && !isAuthenticated && <LoginPanel onLoginSuccess={handleLoginSuccess} />}
      </main>
    </div>
  );
}
