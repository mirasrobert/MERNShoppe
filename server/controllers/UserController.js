import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import { validationResult } from 'express-validator';
import issueJWT from '../utils/issueJwt.js';

/*
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  // Check if user is found & the plain text password is equal to the hashed password
  if (user && (await user.matchPassword(password))) {
    const JWT = issueJWT(user);

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: JWT.token,
      expiresIn: JWT.expires,
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
});

const registerUser = asyncHandler(async (req, res) => {
  res.send('register');
});

export { authUser, registerUser };
