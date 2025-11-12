import { useState } from "react";
import toast from "react-hot-toast";
import "./CreatePost.css";
import api from "../../lib/apiRequest";
import { HiOutlineCamera } from "react-icons/hi";
import { uploadFileToCloudinary } from "../../lib/uploadFile";
import { IoSendSharp } from "react-icons/io5";

const CreatePost = ({ onPostCreated }) => {
  const [text, setText] = useState("");
  const [imageUrl, setImageUrl] = useState(""); URL
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e) => {
    const img = e.target.files?.[0];
    if (!img) return;
    if (!img.type.startsWith("image/")) {
      toast.error("Please choose an image file");
      return;
    }
    if (img.size > 5 * 1024 * 1024) {
      toast.error("Max file size is 5MB");
      return;
    }
    setFile(img);
    setImageUrl(URL.createObjectURL(img));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!text.trim() && !imageUrl && !file) {
      setError("Please add text or image.");
      return;
    }

    setLoading(true);

    try {
      let finalImageUrl = imageUrl && !file ? imageUrl : "";
      if (file) {
        setUploading(true);
        toast.loading("Uploading image...");
        try {
          const uploadedUrl = await uploadFileToCloudinary(file, setUploadProgress);
          finalImageUrl = uploadedUrl;
          toast.dismiss();
          toast.success("Image uploaded");
        } catch (err) {
          toast.dismiss();
          setError("Image upload failed");
          setUploading(false);
          setLoading(false);
          return;
        }
        setUploading(false);
      }

      const payload = { text: text.trim(), image: finalImageUrl };
      const res = await api.post("/posts", payload);
      toast.success("Post created");
      setText("");
      setImageUrl("");
      setFile(null);
      if (onPostCreated) onPostCreated(res.data.post);
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create post";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFile = () => {
    setFile(null);
    setImageUrl("");
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
            <label htmlFor="file-input" className="photo-label">
              <HiOutlineCamera className="camera" />
              <span className="photo">Photo</span>
            </label>

            <input
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
          </div>

          <button
            className="post-btn"
            type="submit"
            disabled={loading || uploading}
          >
            {loading ? (
              "Posting..."
            ) : uploading ? (
              `Uploading ${uploadProgress}%`
            ) : (
              <>
                <IoSendSharp style={{ marginRight: "6px" }} /> Post
              </>
            )}
          </button>
        </div>

        {file && (
          <div className="upload-preview">
            <div className="preview-left">
              <img
                src={URL.createObjectURL(file)}
                alt="preview"
                className="preview-img"
              />
            </div>
            <div className="preview-right">
              <div className="preview-info">
                <div>{file.name}</div>
                <div
                  style={{ fontSize: 12, color: "#888" }}
                >
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
              <button
                type="button"
                className="remove-file-btn"
                onClick={handleRemoveFile}
              >
                Remove
              </button>
            </div>
          </div>
        )}

        {error && <div className="create-error">{error}</div>}
      </form>
    </div>
  );
};

export default CreatePost;
