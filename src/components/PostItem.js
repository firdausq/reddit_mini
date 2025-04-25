// src/components/PostItem.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/components/PostItem.css';

function PostItem({ id, title, author, subreddit, thumbnail, commentsCount, media }) {
  const renderMedia = () => {
    // Falls es ein Video gibt (secure_media oder is_video)
    if (media?.type === 'video') {
      return (
        <video controls width="100%" height="auto">
          <source src={media?.fallback_url || media?.hls_url} type="video/mp4" />
          Ihr Browser unterstützt das Abspielen dieses Videos nicht.
        </video>
      );
    }

    // Falls es ein Bild gibt
    if (media?.type === 'image') {
      return (
        <img
          className="post-thumbnail"
          src={media?.url || thumbnail}
          alt="Post media"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    }

    // Standard-Thumnail, wenn keine Medien vorhanden sind
    if (thumbnail && thumbnail !== 'self' && thumbnail !== 'default') {
      return (
        <img
          className="post-thumbnail"
          src={thumbnail}
          alt="Post thumbnail"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    }

    return null; // Falls kein Bild oder Video vorhanden ist
  };

  return (
    <Link to={`/post/${id}`} className="post-link">
      <div className="post-item" data-testid="post-item">
        {renderMedia()}
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
