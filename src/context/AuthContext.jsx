import { createContext, useContext, useState, useEffect } from 'react';
import { getLocalStorage, setLocalStorage } from '../utils/helpers';
import { validateEmail, validatePassword, hashPassword } from '../utils/helpers';
import PropTypes from 'prop-types';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = getLocalStorage('blog_app_user');
    if (storedUser) {
      setUser(storedUser);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      setError(null);
      
      if (!validateEmail(email)) {
        throw new Error('Geçersiz email adresi');
      }

      const users = getLocalStorage('blog_app_users') || [];
      const user = users.find(u => u.email === email);

      if (!user) {
        throw new Error('Kullanıcı bulunamadı');
      }

      if (user.password !== hashPassword(password)) {
        throw new Error('Hatalı şifre');
      }

      const { password: _, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      setLocalStorage('blog_app_user', userWithoutPassword);
      
      return userWithoutPassword;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (username, email, password) => {
    try {
      setError(null);

      if (!username || username.length < 3) {
        throw new Error('Kullanıcı adı en az 3 karakter olmalıdır');
      }

      if (!validateEmail(email)) {
        throw new Error('Geçersiz email adresi');
      }

      if (!validatePassword(password)) {
        throw new Error('Şifre en az 6 karakter olmalıdır');
      }

      const users = getLocalStorage('blog_app_users') || [];
      
      if (users.some(u => u.email === email)) {
        throw new Error('Bu email adresi zaten kullanılıyor');
      }

      if (users.some(u => u.username === username)) {
        throw new Error('Bu kullanıcı adı zaten kullanılıyor');
      }

      const newUser = {
        id: Math.random().toString(36).substr(2, 9),
        username,
        email,
        password: hashPassword(password),
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      setLocalStorage('blog_app_users', users);

      const { password: _, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setLocalStorage('blog_app_user', userWithoutPassword);

      return userWithoutPassword;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const logout = () => {
    setUser(null);
    setLocalStorage('blog_app_user', null);
    window.location.href = '/';
  };

  const value = {
    user,
    loading,
    error,
    login,
    register,
    logout,
  };

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 