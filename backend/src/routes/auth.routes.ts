import express from 'express';
import { registerUser, loginUser, updateUserProfile, forgotPassword } from '../controllers/auth.controller';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser)
router.put("/edit", updateUserProfile);
router.post("/forgot-password", forgotPassword);

export default router;
