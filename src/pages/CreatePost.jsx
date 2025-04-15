import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../hooks/usePosts';
import Form from '../components/ui/molecules/Form';
import Input from '../components/ui/atoms/Input';
import Button from '../components/ui/atoms/Button';
import Card from '../components/ui/molecules/Card';

const CreatePost = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { createPost } = usePosts();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await createPost({
        title: formData.title,
        content: formData.content,
        authorId: user.id,
        authorName: user.username,
      });
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const isFormValid = formData.title.trim() !== '' && formData.content.trim() !== '';

  return (
    <div className="max-w-4xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
        Yeni Yazı Oluştur
      </h1>

      <Card>
        <Form onSubmit={handleSubmit} className="space-y-6">
          {error && (
            <div className="rounded-md bg-red-50 dark:bg-red-900 p-4">
              <div className="text-sm text-red-700 dark:text-red-200">{error}</div>
            </div>
          )}

          <div>
            <Input
              type="text"
              name="title"
              label="Başlık"
              placeholder="Yazınızın başlığını girin"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label
              htmlFor="content"
              className="block text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              İçerik
            </label>
            <textarea
              id="content"
              name="content"
              rows={8}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              placeholder="Yazınızın içeriğini girin"
              value={formData.content}
              onChange={handleChange}
              required
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="button"
              variant="outline"
              className="mr-3"
              onClick={() => navigate('/')}
            >
              İptal
            </Button>
            <Button
              type="submit"
              loading={loading}
              disabled={loading || !isFormValid}
            >
              Kaydet
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePost; 