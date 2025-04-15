import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPosts } from '../services/storage';
import PostCard from '../components/ui/organisms/PostCard';
import Button from '../components/ui/atoms/Button';
import { PlusIcon } from '../components/ui/atoms/icons';

const Home = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = () => {
      try {
        // Service fonksiyonunu kullanarak postları getir
        const allPosts = getPosts();
        // Sort posts by creation date, newest first
        setPosts(allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (error) {
        console.error('Posts yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Blog Yazıları
        </h1>
        {user && (
          <Link to="/post/create">
            <Button variant="primary" size="md">
              <PlusIcon size={20} className="mr-2" />
              Yeni Yazı
            </Button>
          </Link>
        )}
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            Henüz hiç blog yazısı yok.
          </p>
          {user && (
            <Link to="/post/create" className="mt-4 inline-block">
              <Button variant="primary" size="md">
                İlk Yazıyı Oluştur
              </Button>
            </Link>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home; 