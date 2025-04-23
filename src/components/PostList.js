import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import PostItem from './PostItem';
import LoadingSpinner from './LoadingSpinner';

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const errorMessage = useSelector((state) => state.posts.errorMessage);
  const searchTerm = useSelector((state) => state.search.term);

  useEffect(() => {
    dispatch(fetchPosts(searchTerm));
  }, [searchTerm, dispatch]);

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'failed') {
    return (
      <div className="error-message">
        <p>⚠️ {errorMessage}</p>
        {posts.length > 0 && <p>Showing cached posts instead.</p>}
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          title={post.title}
          author={post.author}
          subreddit={post.subreddit}
          thumbnail={post.thumbnail}
          commentsCount={post.num_comments}
        />
      ))}
    </div>
  );
}

export default PostList;
