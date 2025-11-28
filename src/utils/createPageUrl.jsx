// src/utils/createPageUrl.js

/**
 * Gera a URL de navegação para uma página específica do app.
 * Exemplo:
 * createPageUrl("Home") → "/home"
 * createPageUrl("CustomRegister") → "/register"
 */

export function createPageUrl(pageName) {
  if (!pageName) return "/";

  // Mapeamento manual de rotas (caso queira nomes diferentes do componente)
  const routes = {
    Home: "/",
    CustomLogin: "/login",
    CustomRegister: "/register",
  };

  // Se existir no mapeamento, retorna o caminho correspondente
  if (routes[pageName]) return routes[pageName];

  // Caso contrário, gera o path automaticamente (ex: "UserProfile" → "/user-profile")
  const formatted = pageName
    .replace(/([a-z])([A-Z])/g, "$1-$2") // separa camelCase
    .toLowerCase();

  return `/${formatted}`;
}
