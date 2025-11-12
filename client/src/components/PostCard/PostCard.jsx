import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./PostCard.css";
import api from "../../lib/apiRequest";
import { formatDateTime } from "../../lib/utils";
import { MdComment } from "react-icons/md";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { FiShare2 } from "react-icons/fi";

const PostCard = ({ post, onLikeToggle, onAddComment }) => {
  const { user } = useContext(AuthContext);
  const [likesCount, setLikesCount] = useState(post.likes.length || 0);
  const [liked, setLiked] = useState(
    user ? post.likes.includes(user.name) : false
  );
  const [showComments, setShowComments] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentLoading, setCommentLoading] = useState(false);

  const handleLike = async () => {
    try {
      const res = await api.put(`/posts/${post._id}/like`);
      setLikesCount(res.data.likes);
      setLiked((p) => !p);
      if (onLikeToggle) onLikeToggle(post._id, res.data.likes);
    } catch (err) {
      console.error("Like error", err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    setCommentLoading(true);
    try {
      const res = await api.post(`/posts/${post._id}/comment`, {
        text: commentText.trim(),
      });
      setCommentText("");
      setShowComments(true);
      if (onAddComment) onAddComment(post._id, res.data.comments);
    } catch (err) {
      console.error("Comment error", err);
    } finally {
      setCommentLoading(false);
    }
  };

  const usernameHandle = post.userId?.name
    ? "@" + post.userId.name.toLowerCase().replace(/\s+/g, "")
    : "@user";

  return (
    <div className="post-card">
      <div className="post-top">
        <img
          className="avatar"
          src={
            post.userId?.avatar ||
            `https://ui-avatars.com/api/?name=${encodeURIComponent(
              post.userId?.name || "U"
            )}&background=1976d2&color=fff`
          }
          alt="avatar"
        />
        <div className="post-meta">
          <div className="user">
            <div className="name">{post.userId?.name || "Unknown"}</div>
            <div className="handle">{usernameHandle}</div>
          </div>
          <div className="time">{formatDateTime(post.createdAt)}</div>
        </div>
      </div>

      <div className="post-body">
        {post.text && <p className="post-text">{post.text}</p>}
        {post.image && (
          <div className="post-image-wrap">
            <img className="post-image" src={post.image} alt="post" />
          </div>
        )}
      </div>

      <div className="post-actions">
        {/* LIKE BUTTON */}
        <div>
          <button
            className={`action like-btn ${liked ? "liked" : ""}`}
            onClick={handleLike}
          >
            {liked ? (
              <FaHeart className="icon liked-icon" />
            ) : (
              <FaRegHeart className="icon" />
            )}
            <span className="number">{likesCount}</span>
          </button>
        </div>

        {/* COMMENT BUTTON */}
        <div>
          <button
            className="action"
            onClick={() => setShowComments((s) => !s)}
          >
            <MdComment className="icon" />
            <span className="number">{post.comments?.length || 0}</span>
          </button>
        </div>

        {/* SHARE BUTTON */}
        <div>
          <button className="action share">
            <FiShare2 className="icon" />
          </button>
        </div>
      </div>

      {showComments && (
        <div className="comments-section">
          {post.comments?.length ? (
            post.comments.map((c, idx) => (
              <div key={idx} className="comment">
                <strong>{c.username}</strong>
                <span className="comment-text">{c.text}</span>
                <div className="comment-time">
                  {new Date(c.createdAt).toLocaleString()}
                </div>
              </div>
            ))
          ) : (
            <div className="no-comments">No comments yet</div>
          )}

          <form className="comment-form" onSubmit={submitComment}>
            <input
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Write a comment..."
            />
            <button type="submit" disabled={commentLoading}>
              {commentLoading ? "..." : "Reply"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PostCard;
