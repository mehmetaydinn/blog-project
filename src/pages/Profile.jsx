import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getPosts } from '../services/storage';
import { getLocalStorage } from '../utils/helpers';
import Card from '../components/ui/molecules/Card';
import { UserIcon, DocumentIcon, ChatIcon, CalendarIcon } from '../components/ui/atoms/icons';

const Profile = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    postsCount: 0,
    commentsCount: 0,
    lastPostDate: null,
    firstJoinDate: user ? user.createdAt : null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchUserStats = () => {
      try {
        // Kullanıcının blog yazılarını getir
        const allPosts = getPosts();
        const userPosts = allPosts.filter(post => post.authorId === user.id);
        
        // Kullanıcının yorumlarını getir
        const allComments = getLocalStorage('blog_app_comments') || [];
        const userComments = allComments.filter(comment => comment.authorId === user.id);
        
        // Son yazı tarihini bul
        let lastPostDate = null;
        if (userPosts.length > 0) {
          const dateObjects = userPosts.map(post => new Date(post.createdAt));
          lastPostDate = new Date(Math.max(...dateObjects));
        }
        
        // İstatistikleri güncelle
        setStats({
          postsCount: userPosts.length,
          commentsCount: userComments.length,
          lastPostDate,
          firstJoinDate: user.createdAt
        });
      } catch (error) {
        console.error('Kullanıcı istatistikleri yüklenirken hata:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserStats();
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

  // Tarih formatlama fonksiyonu
  const formatDate = (dateString) => {
    if (!dateString) return 'Bilgi yok';
    
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Profilim
      </h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Kullanıcı Bilgileri */}
        <Card className="md:col-span-1">
          <div className="flex flex-col items-center text-center">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-full p-4 mb-4">
              <UserIcon size={80} className="text-primary-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {user.username}
            </h2>
            <div className="w-full space-y-2 text-left">
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">E-posta</span>
                <span className="font-medium text-gray-900 dark:text-white">{user.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-gray-200 dark:border-gray-700">
                <span className="text-gray-500 dark:text-gray-400">Katılma Tarihi</span>
                <span className="font-medium text-gray-900 dark:text-white">
                  {formatDate(stats.firstJoinDate)}
                </span>
              </div>
            </div>
          </div>
        </Card>
        
        {/* İstatistikler */}
        <Card className="md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            İstatistikler
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Blog Yazıları */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg flex items-center">
              <DocumentIcon size={48} className="text-blue-600 dark:text-blue-400 mr-4" />
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400">Blog Yazılarım</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.postsCount}</span>
              </div>
            </div>
            
            {/* Yorumlar */}
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg flex items-center">
              <ChatIcon size={48} className="text-green-600 dark:text-green-400 mr-4" />
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400">Yorumlarım</span>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">{stats.commentsCount}</span>
              </div>
            </div>
            
            {/* Son Yazı Tarihi */}
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg flex items-center">
              <CalendarIcon size={48} className="text-purple-600 dark:text-purple-400 mr-4" />
              <div>
                <span className="block text-sm text-gray-500 dark:text-gray-400">Son Yazı Tarihi</span>
                <span className="text-md font-bold text-gray-900 dark:text-white">{formatDate(stats.lastPostDate)}</span>
              </div>
            </div>
          </div>
          
          {/* Aktivite Özeti */}
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Aktivite Özeti
            </h3>
            
            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg">
              {stats.postsCount > 0 ? (
                <p className="text-gray-600 dark:text-gray-300">
                  Bugüne kadar <span className="font-semibold">{stats.postsCount}</span> blog yazısı yazdınız ve <span className="font-semibold">{stats.commentsCount}</span> yorumda bulundunuz. Son yazınızı <span className="font-semibold">{formatDate(stats.lastPostDate)}</span> tarihinde paylaştınız.
                </p>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">
                  Henüz blog yazısı yazmadınız. İlk blog yazınızı oluşturmak için "Yeni Yazı" butonunu kullanabilirsiniz.
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Profile; 