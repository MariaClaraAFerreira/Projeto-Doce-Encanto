import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  // Função para carregar usuário
  const loadUser = async () => {
    try {
      const res = await axios.get("/api/auth/me");

      if (res.data?.cliente) {
        setUser(res.data.cliente);
        setIsAdmin(res.data.cliente.nivel === "admin");
      } else {
        setUser(null);
        setIsAdmin(false);
      }
    } catch (err) {
      console.error("Erro ao carregar usuário:", err);
      setUser(null);
      setIsAdmin(false);
    } finally {
      setLoading(false);
    }
  };

  // Carrega usuário ao iniciar
  useEffect(() => {
    loadUser();
  }, []);

  // Login
  const login = async (email, senha) => {
    try {
      const response = await axios.post("/api/auth/login", {
        email,
        senha,
      });

      const { cliente } = response.data;

      // Armazena dados localmente
      localStorage.setItem("cliente", JSON.stringify(cliente));
      
      // Recarrega o usuário para garantir que o estado está sincronizado
      await loadUser();

      return { success: true, cliente };

    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Erro ao fazer login"
      };
    }
  };

  // Registro
  const register = async (nome_completo, email, senha) => {
    try {
      const response = await axios.post("/api/auth/register", {
        nome_completo,
        email,
        senha,
      });

      const { cliente } = response.data;

      // Armazena dados do novo cliente
      localStorage.setItem("cliente", JSON.stringify(cliente));
      
      // Recarrega o usuário para garantir que o estado está sincronizado
      await loadUser();

      return { success: true, cliente };

    } catch (err) {
      return {
        success: false,
        error: err.response?.data?.message || "Erro ao criar conta"
      };
    }
  };

  // Logout
  const logout = async () => {
    try {
      await axios.post("/api/auth/logout");
      localStorage.removeItem("cliente");
      setUser(null);
      setIsAdmin(false);
    } catch (err) {
      console.error("Erro ao fazer logout:", err);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        cliente: user, // Alias para compatibilidade
        loading,
        login,
        logout,
        register,
        isAdmin,
        authenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
