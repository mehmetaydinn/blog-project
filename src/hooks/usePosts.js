import { useCallback } from 'react';
import { getPosts, addPost, updatePost, deletePost } from '../services/storage';

export const usePosts = () => {
  const getAllPosts = useCallback(() => {
    return getPosts();
  }, []);

  const createPost = useCallback((postData) => {
    if (!postData.title || !postData.title.trim()) {
      throw new Error('Başlık alanı zorunludur');
    }

    if (!postData.content || !postData.content.trim()) {
      throw new Error('İçerik alanı zorunludur');
    }

    if (!postData.authorId) {
      throw new Error('Kullanıcı bilgisi gereklidir');
    }

    return addPost({
      title: postData.title.trim(),
      content: postData.content.trim(),
      authorId: postData.authorId,
      authorName: postData.authorName
    });
  }, []);

  const editPost = useCallback((postId, postData, userId) => {
    if (!postData.title || !postData.title.trim()) {
      throw new Error('Başlık alanı zorunludur');
    }

    if (!postData.content || !postData.content.trim()) {
      throw new Error('İçerik alanı zorunludur');
    }

    if (!userId) {
      throw new Error('Kullanıcı bilgisi gereklidir');
    }

    return updatePost(
      postId, 
      {
        title: postData.title.trim(),
        content: postData.content.trim()
      },
      userId
    );
  }, []);

  const removePost = useCallback((postId, userId) => {
    if (!postId) {
      throw new Error('Yazı ID\'si gereklidir');
    }

    if (!userId) {
      throw new Error('Kullanıcı bilgisi gereklidir');
    }

    return deletePost(postId, userId);
  }, []);

  return {
    getAllPosts,
    createPost,
    editPost,
    removePost
  };
}; 