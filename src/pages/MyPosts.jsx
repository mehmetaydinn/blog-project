import { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPosts } from '../services/storage';
import PostCard from '../components/ui/organisms/PostCard';
import Button from '../components/ui/atoms/Button';
import { PlusIcon } from '../components/ui/atoms/icons';

const MyPosts = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Kullanıcı giriş yapmamışsa, postları getirme
    if (!user) return;

    const fetchMyPosts = () => {
      try {
        // Service fonksiyonunu kullanarak postları getir
        const allPosts = getPosts();
        // Kullanıcıya ait postları filtrele ve tarihe göre sırala (en yenisi üstte)
        const myPosts = allPosts
          .filter(post => post.authorId === user.id)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        
        setPosts(myPosts);
      } catch (error) {
        console.error('Postlar yüklenirken hata oluştu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, [user]);

  // Eğer kullanıcı giriş yapmamışsa, login sayfasına yönlendir
  if (!user) {
    return <Navigate to="/login" replace />;
  }

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
          Yazılarım
        </h1>
        <Link to="/post/create">
          <Button variant="primary" size="md">
            <PlusIcon size={20} className="mr-2" />
            Yeni Yazı Ekle
          </Button>
        </Link>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
            Henüz blog yazınız bulunmuyor.
          </p>
          <Link to="/post/create">
            <Button variant="primary" size="md">
              <PlusIcon size={20} className="mr-2" />
              İlk Yazınızı Oluşturun
            </Button>
          </Link>
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

export default MyPosts; 