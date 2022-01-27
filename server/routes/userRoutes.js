import express from 'express';
import passport from 'passport';
const router = express.Router();
import { body } from 'express-validator';
import { authUser, getUserProfile } from '../controllers/UserController.js';
const auth = passport.authenticate('jwt', { session: false });

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please put a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authUser
);

router.route('/profile').get(auth, getUserProfile);

export default router;
