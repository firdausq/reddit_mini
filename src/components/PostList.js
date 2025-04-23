import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from '../features/posts/postsSlice';
import PostItem from './PostItem';
import LoadingSpinner from './LoadingSpinner';

function PostList() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.items);
  const status = useSelector((state) => state.posts.status);
  const searchTerm = useSelector((state) => state.search.term);

  useEffect(() => {
    dispatch(fetchPosts(searchTerm));
  }, [searchTerm, dispatch]);

  if (status === 'loading') return <LoadingSpinner />;;
  if (status === 'failed') return <p>Error loading posts.</p>;

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
