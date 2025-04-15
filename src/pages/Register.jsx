import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Form from '../components/ui/molecules/Form';
import Input from '../components/ui/atoms/Input';
import Button from '../components/ui/atoms/Button';
import Card from '../components/ui/molecules/Card';

const Register = () => {
  const navigate = useNavigate();
  const { register, error: authError } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.passwordConfirm) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    setLoading(true);

    try {
      await register(formData.username, formData.email, formData.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = 
    formData.username.trim() !== '' && 
    formData.email.trim() !== '' && 
    formData.password.trim() !== '' && 
    formData.passwordConfirm.trim() !== '' &&
    formData.password === formData.passwordConfirm;

  return (
    <div className="flex items-center justify-center bg-gray-50 dark:bg-gray-900 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-6">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            Yeni hesap oluşturun
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
            Zaten hesabınız var mı?{' '}
            <Link
              to="/login"
              className="font-medium text-primary-600 hover:text-primary-500 dark:text-primary-400"
            >
              Giriş yap
            </Link>
          </p>
        </div>

        <Card>
          <Form onSubmit={handleSubmit} className="space-y-6">
            {(error || authError) && (
              <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
                <div className="text-sm text-red-700 dark:text-red-200">
                  {error || authError}
                </div>
              </div>
            )}

            <div>
              <Input
                type="text"
                name="username"
                label="Kullanıcı adı"
                placeholder="kullanici_adi"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Input
                type="email"
                name="email"
                label="Email adresi"
                placeholder="ornek@email.com"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                name="password"
                label="Şifre"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Input
                type="password"
                name="passwordConfirm"
                label="Şifre (Tekrar)"
                placeholder="••••••••"
                value={formData.passwordConfirm}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Button
                type="submit"
                className="w-full"
                loading={loading}
                disabled={loading || !isFormValid}
              >
                Kayıt Ol
              </Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  );
};

export default Register; 