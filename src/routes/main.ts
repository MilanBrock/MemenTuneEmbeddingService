// src/routes/users.ts
import { Router } from 'express';
import { SongSubmissionEmbedding, SongSubmissionEmbeddingLocal } from '../controllers/mainController';

const router = Router();

router.post("/song", SongSubmissionEmbedding)
router.post("/songlocal", SongSubmissionEmbeddingLocal)


export default router;
