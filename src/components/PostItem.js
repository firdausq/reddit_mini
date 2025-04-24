// src/components/PostItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/PostItem.css';

function PostItem({ id, title, author, subreddit, thumbnail, commentsCount }) {
  return (
    <Link to={`/post/${id}`} className="post-link">
      <div className="post-item" data-testid="post-item">
        {/* Thumbnail wird hier mit maximaler Breite behandelt */}
        {thumbnail && thumbnail !== 'self' && thumbnail !== 'default' && (
          <img 
            className="post-thumbnail" 
            src={thumbnail} 
            alt="Post thumbnail" 
            style={{ maxWidth: '100%', height: 'auto' }}  // Maximale Größe für Thumbnails
          />
        )}
        <div className="post-content">
          <h2 className="post-title">{title}</h2>
          <div className="post-info">
            <span>Posted by u/{author}</span> · <span>r/{subreddit}</span>
          </div>
          <div className="post-comments">
            💬 {commentsCount} Comments
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostItem;
