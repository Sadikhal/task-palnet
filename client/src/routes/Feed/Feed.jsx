import { useEffect, useState, useContext } from "react";
import CreatePost from "../../components/CreatePost/CreatePost";
import PostCard from "../../components/PostCard/PostCard";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import "./Feed.css";
import api from "../../lib/apiRequest";
import { LuUserRound } from "react-icons/lu";

const Feed = () => {
  const { user } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (currentPage = 1, append = false) => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get(`/posts?page=${currentPage}&limit=3`);
      const fetchedPosts = res.data.posts || [];

      if (append) {
        setPosts((prev) => [...prev, ...fetchedPosts]);
      } else {
        setPosts(fetchedPosts);
      }

      if (currentPage >= res.data.totalPages) {
        setHasMore(false);
      } else {
        setHasMore(true);
      }
    } catch (err) {
      setError("Failed to load feed");
      console.error(err);
      toast.error("Failed to load feed");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(1);
  }, []);

  const handleNewPost = (newPost) => {
    setPosts((p) => [newPost, ...p]);
  };

  const handleLikeToggle = (postId, likesCount) => {
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId ? { ...p, likes: Array(likesCount).fill("x") } : p
      )
    );
  };

  const handleAddComment = (postId, comments) => {
    setPosts((prev) =>
      prev.map((p) => (p._id === postId ? { ...p, comments } : p))
    );
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    fetchPosts(nextPage, true);
    setPage(nextPage);
  };

  return (
    <div className="feed-root">
      <div className="feed-header">
        <h2>Social</h2>
        <div className="header-icons">
          <div className="badge">57</div>
          <div className="balance">₹0.00</div>
          <div className="profile">
            <LuUserRound className="profile-icon" />
            <span className="name">{user.name}</span>
          </div>
        </div>
      </div>

      <CreatePost onPostCreated={handleNewPost} />

      {loading && posts.length === 0 && (
        <div className="feed-loading">Loading...</div>
      )}
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

      {/* Pagination Load More */}
      {!loading && hasMore && posts.length > 0 && (
        <div className="load-more-wrap">
          <button className="load-more-btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
      {loading && posts.length > 0 && (
        <div className="feed-loading">Loading more...</div>
      )}
      {!hasMore && posts.length > 0 && (
        <div className="no-more">No more posts</div>
      )}
    </div>
  );
};

export default Feed;
