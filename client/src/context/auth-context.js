import React, { createContext, useEffect, useState, useContext } from 'react';
import { client } from 'utils/api-client';
import { useQuery } from 'react-query';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  /*const [user, setUser] = useState(null);
  useEffect(() => {
    client.get('/auth/me').then(response => setUser(response.data.user));
  }, []); */

  const { data } = useQuery('AuthProvider', () =>
    client.get('/auth/me').then(response => response.data.user)
  );

  const user = data || null;

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
