import { publishEvent, consumeEvent } from '../config/messagequeue';
import { openAIEmbeddingRequest } from './openai';


// Events to post
export async function publishSongEmbedded(songEmbedding: number[]) {
  await publishEvent('song', 'DescriptionEmbedded', songEmbedding.toString());
  console.log(`Song embedding has been published..`, songEmbedding);
}

export async function publishUserEmbedded(userEmbedding: number[]) {
  await publishEvent('user', 'DescriptionEmbedded', userEmbedding.toString());
  console.log(`User embedding has been published..`, userEmbedding);
}


// Events to listen to
export async function listenToSongSubmissionEvent() {
  await consumeEvent('user', 'DescriptionUpdated', async (msg) => {
    if (msg) {
      console.log('A new song has been submitted, creating a new song embedding');
      const messageContent = msg.content.toString();
      const embedding = await openAIEmbeddingRequest(messageContent);
      if (embedding) {
        publishSongEmbedded(embedding);
      } else {
        console.error('Unable to create song embedding');
      }
    }
  });
}