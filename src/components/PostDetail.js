import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import '../styles/components/PostDetail.css';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://www.reddit.com/comments/${id}.json`)
      .then((res) => res.json())
      .then(([postRes, commentsRes]) => {
        const postData = postRes.data.children[0].data;
        const commentData = commentsRes.data.children.map(c => c.data);
        setPost(postData);
        setComments(commentData);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load post detail:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <LoadingSpinner />;
  if (!post) return <p>Post not found.</p>;

  const isImageUrl = (url) => {
    return (/\.(jpeg|jpg|gif|png)$/i).test(url);
  };

  const renderContent = () => {
    // 1. Galerie
    if (post.is_gallery && post.gallery_data && post.media_metadata) {
      return (
        <div className="gallery">
          {post.gallery_data.items.map((item) => {
            const media = post.media_metadata[item.media_id];
            const imgSrc = media?.s?.u?.replace(/&amp;/g, "&");
            return (
              <div key={item.media_id} className="gallery-item">
                <img src={imgSrc} alt="Gallery Item" className="gallery-image" />
              </div>
            );
          })}
        </div>
      );
    }
    // 2. Direktes Bild
    else if (isImageUrl(post.url)) {
      return (
        <img src={post.url} alt="Post" style={{ maxWidth: '100%', height: 'auto' }} />
      );
    }
    // 3. Text-Post
    else if (post.selftext) {
      return (
        <p className="content">{post.selftext}</p>
      );
    }
    // 4. Sonstiger externer Link
    else if (post.url) {
      return (
        <a href={post.url} target="_blank" rel="noreferrer" className="external-link">
          Visit Link
        </a>
      );
    }
    return null;
  };

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p className="author">by u/{post.author}</p>

      {renderContent()}

      <h3>Comments</h3>
      <ul className="comments-list">
        {comments.map((comment) => (
          <li key={comment.id} className="comment">
            <p className="comment-author">u/{comment.author}</p>
            <p className="comment-body">{comment.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PostDetail;
