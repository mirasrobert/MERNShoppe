import express from 'express';
const router = express.Router();
import { body } from 'express-validator';
import { authUser, registerUser } from '../controllers/UserController.js';

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Please put a valid email'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  authUser
);

export default router;
