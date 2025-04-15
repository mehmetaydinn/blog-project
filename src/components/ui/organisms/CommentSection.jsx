import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import Button from '../atoms/Button';
import Input from '../atoms/Input';
import Card from '../molecules/Card';
import Modal from '../molecules/Modal';
import { formatDate, getLocalStorage, setLocalStorage } from '../../../utils/helpers';
import { EditIcon, TrashIcon, DotsVerticalIcon } from '../atoms/icons';

const CommentSection = ({ postId }) => {
  const { user } = useAuth();
  const [newComment, setNewComment] = useState('');
  const [editComment, setEditComment] = useState({ id: null, content: '' });
  const [comments, setComments] = useState([]);
  const [deleteCommentId, setDeleteCommentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [openMenuId, setOpenMenuId] = useState(null);
  const menuRefs = useRef({});
  
  // Yorumları localStorage'dan yükle
  useEffect(() => {
    loadComments();
  }, [postId]);
  
  // Menü dışına tıklandığında menüyü kapat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openMenuId && menuRefs.current[openMenuId] && !menuRefs.current[openMenuId].contains(event.target)) {
        setOpenMenuId(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openMenuId]);
  
  const loadComments = () => {
    const allComments = getLocalStorage('blog_app_comments') || [];
    const postComments = allComments.filter(comment => comment.postId === postId);
    setComments(postComments);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: Date.now().toString(),
      content: newComment,
      authorId: user.id,
      authorName: user.username,
      createdAt: new Date().toISOString(),
      postId
    };

    // Yorumu localStorage'a ekle
    const allComments = getLocalStorage('blog_app_comments') || [];
    const updatedComments = [...allComments, comment];
    setLocalStorage('blog_app_comments', updatedComments);
    
    // State'i güncelle
    setComments([...comments, comment]);
    setNewComment('');
  };
  
  const handleEdit = (id) => {
    const comment = comments.find(c => c.id === id);
    if (comment) {
      setEditComment({ id, content: comment.content });
      setOpenMenuId(null);
    }
  };
  
  const handleSaveEdit = () => {
    if (!editComment.content.trim()) return;
    
    const allComments = getLocalStorage('blog_app_comments') || [];
    const updatedComments = allComments.map(comment => 
      comment.id === editComment.id 
        ? { ...comment, content: editComment.content, updatedAt: new Date().toISOString() } 
        : comment
    );
    
    setLocalStorage('blog_app_comments', updatedComments);
    loadComments();
    setEditComment({ id: null, content: '' });
  };
  
  const handleDeleteClick = (id) => {
    setDeleteCommentId(id);
    setShowDeleteModal(true);
    setOpenMenuId(null);
  };
  
  const handleConfirmDelete = () => {
    if (!deleteCommentId) return;
    
    const allComments = getLocalStorage('blog_app_comments') || [];
    const updatedComments = allComments.filter(comment => comment.id !== deleteCommentId);
    
    setLocalStorage('blog_app_comments', updatedComments);
    loadComments();
    setShowDeleteModal(false);
    setDeleteCommentId(null);
  };

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  // Menü referansını kaydet
  const setMenuRef = (id, ref) => {
    menuRefs.current[id] = ref;
  };

  // Yorum içeriğinin boş olup olmadığını kontrol et
  const isNewCommentEmpty = newComment.trim() === '';
  // Düzenlenen yorum içeriğinin boş olup olmadığını kontrol et
  const isEditCommentEmpty = editComment.content.trim() === '';

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
        Yorumlar ({comments.length})
      </h3>

      {user && (
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            placeholder="Yorumunuzu yazın..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <Button 
            type="submit" 
            variant="primary"
            disabled={isNewCommentEmpty}
          >
            Yorum Yap
          </Button>
        </form>
      )}

      <div className="space-y-4">
        {comments.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400">Henüz yorum yapılmamış.</p>
        ) : (
          comments.map((comment) => (
            <Card key={comment.id} className="bg-gray-50 dark:bg-gray-800">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium text-gray-900 dark:text-white">
                  {comment.authorName}
                </span>
                <div className="flex items-center space-x-2">
                  <time
                    dateTime={comment.createdAt}
                    className="text-sm text-gray-500 dark:text-gray-400"
                  >
                    {formatDate(comment.createdAt)}
                  </time>
                  
                  {user && user.id === comment.authorId && (
                    <div 
                      className="relative" 
                      ref={(ref) => setMenuRef(comment.id, ref)}
                    >
                      <button
                        onClick={() => toggleMenu(comment.id)}
                        className="p-1 rounded-full text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                      >
                        <DotsVerticalIcon size={16} />
                      </button>
                      
                      {openMenuId === comment.id && (
                        <div className="absolute right-0 mt-1 w-36 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-1 z-10">
                          <button
                            onClick={() => handleEdit(comment.id)}
                            className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <EditIcon size={16} className="mr-2 text-blue-500 dark:text-blue-400" />
                            Düzenle
                          </button>
                          <button
                            onClick={() => handleDeleteClick(comment.id)}
                            className="flex items-center w-full text-left px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <TrashIcon size={16} className="mr-2 text-red-500 dark:text-red-400" />
                            Sil
                          </button>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              {editComment.id === comment.id ? (
                <div className="space-y-2">
                  <Input
                    type="text"
                    value={editComment.content}
                    onChange={(e) => setEditComment({ ...editComment, content: e.target.value })}
                  />
                  <div className="flex space-x-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      onClick={handleSaveEdit}
                      disabled={isEditCommentEmpty}
                    >
                      Kaydet
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setEditComment({ id: null, content: '' })}
                    >
                      İptal
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-gray-600 dark:text-gray-300">{comment.content}</p>
              )}
            </Card>
          ))
        )}
      </div>
      
      {/* Silme Onay Modalı */}
      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteCommentId(null);
        }}
        title="Yorumu Sil"
        showButtons
        confirmText="Evet, Sil"
        cancelText="İptal"
        onConfirm={handleConfirmDelete}
      >
        <p className="text-gray-600 dark:text-gray-300">
          Bu yorumu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
        </p>
      </Modal>
    </div>
  );
};

CommentSection.propTypes = {
  postId: PropTypes.string.isRequired
};

export default CommentSection; 