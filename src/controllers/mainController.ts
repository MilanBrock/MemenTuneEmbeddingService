// src/controllers/userController.ts
import { Request, response, Response } from 'express';
import { openAIEmbeddingRequest, openAIRequest } from '../utils/openai';
import { publishSongEmbedded } from '../utils/messagequeue';
import dotenv from 'dotenv';
import { deconstructJWT } from '../utils/auth';
import { SongSubmission } from '../middlewares/interfaces';
dotenv.config();

export const SongSubmissionEmbedding = async (req: Request, res: Response) => {
    const authHeader = req.headers.authorization as string;
    const songSubmission: SongSubmission = req.body;
    const isValidToken = deconstructJWT(authHeader, songSubmission.userId)
    if (isValidToken){
      try {
        songSubmission.songDescriptionEmbed = await openAIEmbeddingRequest(songSubmission.songDescription);
        if (songSubmission.songDescriptionEmbed.length > 0) {
          console.log('Song embedding has been created');
          publishSongEmbedded(songSubmission);
          res.status(201).json({message:"Song embedding has been created"});
        } else {
          res.status(500).json({message:"Unable to create song embedding"});
        }
      } catch (err) {
        console.error(err);
        
        res.status(500).send('Server Error');
      }
    } else {
      res.status(401).send('Invalid token provided');
  }
};

export const SongSubmissionEmbeddingLocal = async (req: Request, res: Response) => {
  const authHeader = req.headers.authorization as string;
  const songSubmission: SongSubmission = req.body;
  const isValidToken = deconstructJWT(authHeader, songSubmission.userId)
  console.log("Token is:", isValidToken)
  if (isValidToken){
    try {
      songSubmission.songDescriptionEmbed = await openAIEmbeddingRequest(songSubmission.songDescription);
      if (songSubmission.songDescriptionEmbed.length > 0) {
        res.status(201).json({message:"Song embedding has been created", embed: songSubmission.songDescriptionEmbed});
      } else {
        res.status(500).json({message:"Unable to create song embedding"});
      }
    } catch (err) {
      console.error(err);
      res.status(500).send('Server Error');
    }
  } else {
      res.status(500).send('Server Error');
  }
  
  
};













