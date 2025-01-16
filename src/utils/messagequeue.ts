import { publishEvent, consumeEvent } from '../config/messagequeue';
import { SongSubmission, UserDescriptionEmbedded, UserDescriptionUpdated } from '../middlewares/interfaces';
import { openAIEmbeddingRequest } from './openai';


// Events to post
export async function publishSongEmbedded(songSubmission: SongSubmission) {
  await publishEvent('song', 'DescriptionEmbedded', songSubmission.toString());
  console.log(`Song embedding has been published..`, songSubmission);
}

export async function publishUserEmbedded(userEmbedding: UserDescriptionEmbedded) {
  await publishEvent('user', 'DescriptionEmbedded', userEmbedding.toString());
  console.log(`User embedding has been published..`, userEmbedding);
}


// Events to listen to
export async function listenToUserDescriptionEvent() {
  await consumeEvent('user', 'DescriptionUpdated', async (msg) => {
    if (msg) {
      console.log('A user has updated their description, creating a new user embedding');
      const userDescriptionUpdated: UserDescriptionUpdated = JSON.parse(msg.content.toString());
      const embedding = await openAIEmbeddingRequest(userDescriptionUpdated.userDescription);
      if (embedding) {
        const userEmbedded: UserDescriptionEmbedded = {...userDescriptionUpdated, userDescriptionEmbedded: embedding}
        publishUserEmbedded(userEmbedded);
      } else {
        console.error('Unable to create user embedding');
      }
    }
  });
}