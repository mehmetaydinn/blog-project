import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLocalStorage, setLocalStorage } from '../utils/helpers';
import Form from '../components/ui/molecules/Form';
import Input from '../components/ui/atoms/Input';
import Button from '../components/ui/atoms/Button';
import Card from '../components/ui/molecules/Card';

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchPost = () => {
      try {
        const posts = getLocalStorage('blog_app_posts') || [];
        const post = posts.find(p => p.id === id);

        if (!post) {
          setError('Yazı bulunamadı');
          return;
        }

        if (post.authorId !== user.id) {
          setError('Bu yazıyı düzenleme yetkiniz yok');
          return;
        }

        setFormData({
          title: post.title,
          content: post.content
        });
      } catch (error) {
        console.error('Yazı yüklenirken hata:', error);
        setError('Yazı yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id, user.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      if (!formData.title.trim() || !formData.content.trim()) {
        throw new Error('Başlık ve içerik alanları zorunludur');
      }

      const posts = getLocalStorage('blog_app_posts') || [];
      const updatedPosts = posts.map(post => {
        if (post.id === id) {
          return {
            ...post,
            title: formData.title.trim(),
            content: formData.content.trim(),
            updatedAt: new Date().toISOString()
          };
        }
        return post;
      });

      setLocalStorage('blog_app_posts', updatedPosts);
      navigate(`/post/${id}`);
    } catch (error) {
      console.error('Yazı güncellenirken hata:', error);
      setError(error.message);
    } finally {
      setSaving(false);
    }
  };

  // Form alanlarının geçerliliğini kontrol et
  const isFormValid = formData.title.trim() !== '' && formData.content.trim() !== '';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            {error}
          </h2>
          <Button
            variant="primary"
            size="md"
            className="mt-4"
            onClick={() => navigate('/')}
          >
            Ana Sayfaya Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Yazıyı Düzenle
          </h1>
        </div>

        <Form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Başlık"
                size="lg"
                required
              />
            </div>

            <div>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="İçerik"
                rows="10"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>

            {error && (
              <div className="text-red-600 dark:text-red-400 text-sm">
                {error}
              </div>
            )}

            <div className="flex justify-end space-x-2">
              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={() => navigate(`/post/${id}`)}
              >
                İptal
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={saving || !isFormValid}
              >
                {saving ? 'Kaydediliyor...' : 'Kaydet'}
              </Button>
            </div>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default EditPost; 