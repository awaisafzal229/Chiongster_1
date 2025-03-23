interface AuthTokens {
  access_token: string;
  refresh_token: string;
}

interface User {
  phone_number: string;
  email: string;
}

export const setAuthTokens = (tokens: AuthTokens) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', tokens.access_token);
    localStorage.setItem('refresh_token', tokens.refresh_token);
  }
};

export const getAuthTokens = (): AuthTokens | null => {
  if (typeof window === 'undefined') return null;
  
  const access_token = localStorage.getItem('access_token');
  const refresh_token = localStorage.getItem('refresh_token');
  
  if (!access_token || !refresh_token) return null;
  
  return { access_token, refresh_token };
};

export const setUser = (user: User) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('user', JSON.stringify(user));
  }
};

export const getUser = (): User | null => {
  if (typeof window === 'undefined') return null;
  
  const userStr = localStorage.getItem('user');
  if (!userStr) return null;
  
  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
};

export const clearAuth = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }
};

export const isAuthenticated = (): boolean => {
  return !!getAuthTokens()?.access_token;
};

// Utility function to get headers for authenticated requests
export const getAuthHeaders = (): HeadersInit => {
  const tokens = getAuthTokens();
  return {
    'Content-Type': 'application/json',
    ...(tokens?.access_token ? { 'Authorization': `Bearer ${tokens.access_token}` } : {})
  };
};
