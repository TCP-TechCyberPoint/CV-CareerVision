import { createContext, useContext, useEffect, useState, useRef } from 'react';
import { keycloak, initAuth } from './keycloak';

type CtxT = { 
  ready: boolean; 
  login: () => void; 
  logout: () => void; 
  token: () => string|undefined; 
  authenticated: boolean;
  error?: string;
};

const Ctx = createContext<CtxT>({ 
  ready: false, 
  login: () => keycloak.login(), 
  logout: () => keycloak.logout(), 
  token: () => keycloak.token as any,
  authenticated: false
});

export const useAuth = () => useContext(Ctx);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const initRef = useRef(false);

  useEffect(() => { 
    if (initRef.current) return;
    initRef.current = true;
    
    initAuth().then(() => {
      setReady(true);
      setAuthenticated(keycloak.authenticated || false);
      setError(undefined);
    }).catch((error) => {
      console.error('Auth initialization failed:', error);
      setError(error.message || 'Authentication initialization failed');
      setReady(true); // Set ready even on error to prevent infinite loading
    }); 
  }, []);

  useEffect(() => {
    const t = setInterval(() => {
      if (keycloak.authenticated) {
        keycloak.updateToken(30).catch(() => {
          // If token refresh fails, redirect to login
          keycloak.login();
        });
      }
    }, 10000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    setAuthenticated(keycloak.authenticated || false);
  }, [keycloak.authenticated]);

  return (
    <Ctx.Provider value={{ 
      ready, 
      login: () => keycloak.login(), 
      logout: () => keycloak.logout(), 
      token: () => keycloak.token,
      authenticated,
      error
    }}>
      {children}
    </Ctx.Provider>
  );
}
