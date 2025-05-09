import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// Önce ana CSS dosyasını içe aktar
import './styles/index.css';
// Sonra UI Kit CSS'i içe aktar
import './styles/ui-kit.css';
// Import storage service to initialize data
import './services/storage';

// IIFE: Sayfanın "flash of light" sorununu önlemek için, DOM oluşturulmadan önce kullanıcının tema tercihini uygula
(() => {
  // localStorage'daki tema tercihini kontrol et
  const savedTheme = localStorage.getItem('blog_theme');
  
  // Tema tercihi yoksa varsayılan olarak light tema uygula
  if (!savedTheme) {
    // Varsayılan olarak light tema
    document.documentElement.classList.remove('dark');
    localStorage.setItem('blog_theme', 'light');
  } else if (savedTheme === 'dark') {
    // Kullanıcı karanlık modu seçmiş
    document.documentElement.classList.add('dark');
  } else {
    // Light tema
    document.documentElement.classList.remove('dark');
  }
})();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
