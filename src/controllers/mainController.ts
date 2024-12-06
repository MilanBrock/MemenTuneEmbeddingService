// src/controllers/userController.ts
import { Request, Response } from 'express';
import { openAIEmbeddingRequest, openAIRequest } from '../utils/openai';
import { publishSongEmbedded } from '../utils/messagequeue';
import dotenv from 'dotenv';
dotenv.config();



export const CreateSongEmbedding = async (req: Request, res: Response) => {
    const { songDescription } = req.body;
  try {
    const response = await openAIEmbeddingRequest(songDescription);
    if (response.length > 0) {
      console.log('Song embedding has been created');
      publishSongEmbedded(response);
      res.status(201).json({message:"Song embedding has been created"});
    } else {
      res.status(500).json({message:"Unable to create song embedding"});
    }
 
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
};













