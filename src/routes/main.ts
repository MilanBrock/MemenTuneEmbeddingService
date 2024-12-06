// src/routes/users.ts
import { Router } from 'express';
import { CreateSongEmbedding } from '../controllers/mainController';

const router = Router();

router.post("/song", CreateSongEmbedding)


export default router;
