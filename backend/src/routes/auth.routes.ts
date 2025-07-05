import express from 'express';
import { registerUser, loginUser, updateUserProfile } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.put("/edit", updateUserProfile);

export default router;
