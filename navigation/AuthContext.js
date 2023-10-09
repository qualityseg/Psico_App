// AuthContext.js

import { createContext } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  setAuthentication: () => {},
  userData: null,  // Novo campo para armazenar dados do usuário
  setUserData: () => {},  // Novo método para atualizar dados do usuário
});

export default AuthContext;
