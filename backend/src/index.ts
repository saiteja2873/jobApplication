import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes'; // ✅ Import router, not controller

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors({
  origin: "http://localhost:5173", // your frontend port
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes); // ✅ Correctly use router here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
