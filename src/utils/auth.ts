import jwt from 'jsonwebtoken';

/**
 * Deconstructs a JWT and validates its payload using a secret key from environment variables.
 * Checks if the 'origin' matches the environment variable 'JWT_ORIGIN' and if the 'userId' matches the provided userId.
 * @param token - The JWT to be deconstructed.
 * @param userId - The userId to be matched with the one in the token.
 * @returns True if the token is valid, the origin matches, and the userId matches, otherwise false.
 */
export const deconstructJWT = (token: string, userId: string): boolean => {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
        console.error('Secret key not found in environment variables');
        return false;
    }

    try {
        if (token.startsWith("Bearer ")) {
            token = token.slice(7);
        }
        console.log("verifying token...")
        const decoded = jwt.verify(token, secretKey) as any;
        console.log(decoded)
        if (decoded) {
            return true;
        } else {
            console.error('Token origin does not match or userId does not match');
            return false;
        }
    } catch (err) {
        console.error('Invalid token:', err);
        return false;
    }
};
