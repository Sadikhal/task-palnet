import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import "./CreatePost.css";
import api from "../../lib/apiRequest";

const CreatePost = ({ onPostCreated }) => {
  const { user } = useContext(AuthContext);
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!text.trim() && !image.trim()) {
      setError("Please add text or image URL.");
      return;
    }
    setLoading(true);
    try {
      const payload = { text: text.trim(), image: image.trim() };
      const res = await api.post("/posts", payload);
      toast.success("Post created");
      setText("");
      setImage("");
      if (onPostCreated) onPostCreated(res.data.post);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create post";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-card">
      <div className="create-header">
        <h3>Create Post</h3>
        <div className="create-tabs">
          <button className="tab active">All Posts</button>
          <button className="tab">My Posts</button>
        </div>
      </div>

      <form className="create-form" onSubmit={handleSubmit}>
        <textarea
          className="create-text"
          placeholder="What's on your mind?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={3}
        />
        <div className="create-bottom">
          <div className="photo-wrap">
            <label className="photo-label">📷 Photo</label>
            <input
              className="photo-input"
              placeholder="Image URL (optional)"
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          <button className="post-btn" type="submit" disabled={loading}>
            {loading ? "Posting..." : "Post ▶"}
          </button>
        </div>
        {error && <div className="create-error">{error}</div>}
      </form>
    </div>
  );
};

export default CreatePost;
