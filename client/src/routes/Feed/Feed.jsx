// src/pages/Feed/Feed.jsx
import  { useEffect, useState, useContext } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import "./Feed.css";
import api from "../../lib/apiRequest";

const Feed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchPosts = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.get("/posts");
      setPosts(res.data.posts || []);
    } catch (err) {
      setError("Failed to load feed");
      console.error(err);
      toast.error("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleNewPost = (newPost) => {
    // Add newly created post at top (optimistic)
    setPosts((p) => [newPost, ...p]);
  };

  const handleLikeToggle = (postId, likesCount) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? { ...p, likes: Array(likesCount).fill("x") } : p))
    );
    // Note: backend returns count; we update only UI count in PostCard via setLikesCount
  };

  const handleAddComment = (postId, comments) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? { ...p, comments } : p))
    );
  };

  return (
    <div className="feed-root">
      <div className="feed-header">
        <h2>Social</h2>
        <div className="header-icons">
          <div className="badge">57</div>
          <div className="balance">₹0.00</div>
          <div className="bell">🔔</div>
          <div className="profile"> {/* placeholder */} </div>
        </div>
      </div>

      <CreatePost onPostCreated={handleNewPost} />

      {loading && <div className="feed-loading">Loading...</div>}
      {error && <div className="feed-error">{error}</div>}

      <div className="posts-list">
        {posts.length === 0 && !loading ? (
          <div className="no-posts">No posts yet</div>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onLikeToggle={handleLikeToggle}
              onAddComment={handleAddComment}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Feed;
