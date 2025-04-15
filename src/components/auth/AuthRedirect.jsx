import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import PropTypes from 'prop-types';

// Eğer kullanıcı giriş yapmışsa, giriş ve kayıt sayfalarına erişimi engelleyen bileşen
const AuthRedirect = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }
  
  if (user) {
    // Kullanıcı giriş yapmışsa ana sayfaya yönlendir
    return <Navigate to="/" replace />;
  }
  
  // Kullanıcı giriş yapmamışsa giriş/kayıt sayfasını göster
  return children;
};

AuthRedirect.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthRedirect; 