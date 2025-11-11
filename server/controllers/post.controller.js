import Post from "../models/post.model.js";
import User from "../models/user.model.js";
import { createError } from "../lib/createError.js";

export const createPost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { text, image } = req.body;

    if (!text && !image) {
      return next(createError(400, "Post must have text or image"));
    }

    const newPost = new Post({
      userId,
      text,
      image,
    });

    const savedPost = await newPost.save();
    res.status(201).json({
      message: "Post created successfully",
      post: savedPost,
    });
  } catch (err) {
    next(err);
  }
};

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate("userId", "name email") 
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "All posts fetched successfully",
      posts,
    });
  } catch (err) {
    next(err);
  }
};

export const getUserPosts = async (req, res, next) => {
  try {
    const userId = req.userId;
    const posts = await Post.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json({
      message: "User posts fetched successfully",
      posts,
    });
  } catch (err) {
    next(err);
  }
};

export const toggleLike = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const post = await Post.findById(req.params.id);
    if (!post) return next(createError(404, "Post not found"));

    const username = user.name;
    const alreadyLiked = post.likes.includes(username);

    if (alreadyLiked) {
      post.likes = post.likes.filter((like) => like !== username);
    } else {
      post.likes.push(username);
    }

    await post.save();
    res.status(200).json({
      message: alreadyLiked ? "Post unliked" : "Post liked",
      likes: post.likes.length,
    });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await User.findById(userId);
    const post = await Post.findById(req.params.id);
    if (!post) return next(createError(404, "Post not found"));

    const newComment = {
      username: user.name,
      text: req.body.text,
    };

    post.comments.push(newComment);
    await post.save();

    res.status(200).json({
      message: "Comment added successfully",
      comments: post.comments,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const userId = req.userId;
    const post = await Post.findById(req.params.id);
    if (!post) return next(createError(404, "Post not found"));

    if (post.userId.toString() !== userId) {
      return next(createError(403, "You can delete only your posts"));
    }

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    next(err);
  }
};
