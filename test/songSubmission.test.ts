import request from 'supertest';
import app from '../src/app'; // Adjust the path to your Express app
import { openAIEmbeddingRequest } from '../src/utils/openai';
import { publishSongEmbedded } from '../src/utils/messagequeue';
import jwt from 'jsonwebtoken';

// Mock the openAIEmbeddingRequest and publishSongEmbedded functions
jest.mock('../src/utils/openai');
jest.mock('../src/utils/messagequeue');
jest.setTimeout(60000); // Set timeout to 10 seconds


describe('POST /song', () => {
    const validToken = jwt.sign({ userId: '123' }, process.env.JWT_SECRET || 'testsecret');
    const songSubmission = {
        userId: '123',
        songDescription: 'A test song description'
    };

    beforeEach(() => {
        (openAIEmbeddingRequest as jest.Mock).mockResolvedValue(['embedding']);
        (publishSongEmbedded as jest.Mock).mockImplementation(() => {});
    });

    it('should return 201 status for a valid token', async () => {
        const response = await request(app)
            .post('/embedding/song')
            .set('Authorization', `Bearer ${validToken}`)
            .send(songSubmission);

        expect(response.status).toBe(201);
    });

    it('should return 401 status if token is invalid', async () => {
        const response = await request(app)
            .post('/embedding/song')
            .set('Authorization', 'Bearer invalidtoken')
            .send(songSubmission);

        expect(response.status).toBe(401);
    });
});





