import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Tarayıcı tercihini kontrol et veya localStorage'daki ayarı kullan
  const [darkMode, setDarkMode] = useState(() => {
    // localStorage'da kaydedilmiş bir tercih var mı?
    const savedTheme = localStorage.getItem('blog_theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Tarayıcı karanlık mod tercihini kontrol et
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Tema değiştiğinde HTML sınıfını güncelle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('blog_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('blog_theme', 'light');
    }
  }, [darkMode]);

  // Tarayıcı tercihi değiştiğinde temanın otomatik değişmesi için
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      if (!localStorage.getItem('blog_theme')) {
        setDarkMode(mediaQuery.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Tema değiştirme fonksiyonu
  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ darkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired
};

// Kullanım kolaylığı için hook
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 