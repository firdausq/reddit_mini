// src/components/PostDetail.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingSpinner from './LoadingSpinner';
import '../styles/components/PostDetail.css';


function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  /*useEffect(() => {
    fetch(`https://www.reddit.com/by_id/t3_${id}.json`)
      .then((res) => res.json())
      .then((data) => setPost(data.data.children[0].data))
      .catch((err) => console.error('Failed to load post detail:', err));
  }, [id]);*/

  useEffect(() => {
    fetch(`https://www.reddit.com/comments/${id}.json`)
      .then((res) => res.json())
      .then(([postRes, commentsRes]) => {
        const postData = postRes.data.children[0].data;
        const commentData = commentsRes.data.children.map(c => c.data);
        setPost(postData);
        console.log('Post data:', postData);
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

  return (
    <div className="post-detail">
      <h2>{post.title}</h2>
      <p className="author">by u/{post.author}</p>
      {post.is_gallery && post.gallery_data && post.media_metadata ? (
        <div className="gallery">
          {post.gallery_data.items.map((item) => {
            const media = post.media_metadata[item.media_id];
            const imgSrc = media?.s?.u?.replace(/&amp;/g, "&"); // HTML decoding
            
            return (
              <img
                key={item.media_id}
                src={imgSrc}
                alt="Gallery image"
                className="gallery-image"
              />
            );
          })}
        </div>
      ) : post.selftext ? (
        <p className="content">{post.selftext}</p>
      ) : post.url ? (
        <a href={post.url} target="_blank" rel="noreferrer">{post.url}</a>
      ) : null}
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
