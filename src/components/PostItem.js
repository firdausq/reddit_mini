// src/components/PostItem.js
import React from 'react';
import '../styles/components/PostItem.css';

function PostItem({ title, author, subreddit, thumbnail, commentsCount }) {
  return (
    <div className="post-item" data-testid="post-item">
      {thumbnail && thumbnail !== 'self' && thumbnail !== 'default' && (
        <img className="post-thumbnail" src={thumbnail} alt="Post thumbnail" />
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
  );
}

export default PostItem;
