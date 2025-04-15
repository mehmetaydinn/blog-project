import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getLocalStorage, setLocalStorage, formatDate } from '../utils/helpers';
import Button from '../components/ui/atoms/Button';
import Card from '../components/ui/molecules/Card';
import Modal from '../components/ui/molecules/Modal';
import CommentSection from '../components/ui/organisms/CommentSection';
import { TrashIcon, EditIcon, DotsVerticalIcon } from '../components/ui/atoms/icons';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const fetchPost = () => {
      try {
        const posts = getLocalStorage('blog_app_posts') || [];
        const foundPost = posts.find(p => p.id === id);
        
        if (!foundPost) {
          setError('Post bulunamadı');
          return;
        }
        
        setPost(foundPost);
      } catch (error) {
        console.error('Post yüklenirken hata oluştu:', error);
        setError('Post yüklenirken bir hata oluştu');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleDelete = () => {
    try {
      const posts = getLocalStorage('blog_app_posts') || [];
      const updatedPosts = posts.filter(p => p.id !== id);
      setLocalStorage('blog_app_posts', updatedPosts);
      navigate('/');
    } catch (error) {
      console.error('Post silinirken hata oluştu:', error);
      setError('Post silinirken bir hata oluştu');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            {error || 'Post bulunamadı'}
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

  const isAuthor = user && user.id === post.authorId;

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <div className="mb-6">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {post.title}
            </h1>
            {isAuthor && (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="p-2 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                  <DotsVerticalIcon size={20} />
                </button>
                
                {isMenuOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        navigate(`/post/${post.id}/edit`);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <EditIcon size={16} className="mr-2 text-blue-500 dark:text-blue-400" />
                      Düzenle
                    </button>
                    <button
                      onClick={() => {
                        setIsMenuOpen(false);
                        setShowDeleteModal(true);
                      }}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <TrashIcon size={16} className="mr-2 text-red-500 dark:text-red-400" />
                      Sil
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <span>{post.authorName}</span>
            <span className="mx-2">•</span>
            <time dateTime={post.createdAt}>
              {formatDate(post.createdAt)}
            </time>
          </div>
        </div>
        <div className="prose dark:prose-invert max-w-none whitespace-pre-wrap">
          {post.content}
        </div>
      </Card>

      <div className="mt-8">
        <CommentSection postId={post.id} />
      </div>

      {/* Silme Onay Modalı */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Yazıyı Sil"
        showButtons
        confirmText="Evet, Sil"
        cancelText="İptal"
        onConfirm={handleDelete}
      >
        <p className="text-gray-600 dark:text-gray-300">
          Bu yazıyı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
      </Modal>
    </div>
  );
};

export default PostDetail; 