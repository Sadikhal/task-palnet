import express from "express";
import {
  createPost,
  getAllPosts,
  getUserPosts,
  toggleLike,
  addComment,
  deletePost,
} from "../controllers/post.controller.js";
import { verifyToken } from "../middlware/verifyToken.js";

const router = express.Router();

router.post("/", verifyToken, createPost);
router.get("/", getAllPosts); 
router.get("/user", verifyToken, getUserPosts); 
router.put("/:id/like", verifyToken, toggleLike); 
router.post("/:id/comment", verifyToken, addComment);
router.delete("/:id", verifyToken, deletePost); 

export default router;
