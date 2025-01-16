export interface SongSubmission {
    userId: string,
    songDescription: string,
    songDescriptionEmbed: number[],
    songLink: string
}

export interface UserDescriptionUpdated {
    userId: string,
    userDescription: string
}

export interface UserDescriptionEmbedded {
    userId: string,
    userDescription: string,
    userDescriptionEmbedded: number[]
}