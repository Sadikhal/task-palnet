import bcrypt from 'bcryptjs';
import User from '../models/user.model.js';
import { createError } from '../lib/createError.js';
import jwt from 'jsonwebtoken';

const cookieOptions = () => ({
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production', // secure only in production
  sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
});

export const register = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
      return next(createError(400, 'Name, email and password are required'));
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(createError(400, 'Email already registered'));
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = new User({
      email,
      password: hash,
      name,
    });

    await user.save();
    return res.status(201).json({ message: 'User created' });
  } catch (err) {
    next(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return next(createError(400, 'Email and password are required'));

    const user = await User.findOne({ email });
    if (!user) return next(createError(401, 'User not found'));

    const isCorrect = await bcrypt.compare(password, user.password);
    if (!isCorrect) return next(createError(401, 'Wrong credentials'));

    const token = jwt.sign({ id: user._id }, process.env.JWT_KEY, { expiresIn: '7d' });

    const { password: pwd, ...info } = user._doc;
    res
      .cookie('access_token', token, cookieOptions())
      .status(200)
      .json(info);
  } catch (error) {
    next(error);
  }
};

export const logOut = (req, res, next) => {
  res
    .clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
    })
    .status(200)
    .send('User has been logged out');
};

export const getUser = async (req, res, next) => {
  try {
    const id = req.userId; // set by verifyToken
    if (!id) return next(createError(401, 'Unauthorized'));

    const user = await User.findById(id).select('-password');
    if (!user) return next(createError(404, 'User not found'));

    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};
