import { jwtVerify } from 'jose';
import { JwtPayload } from 'jsonwebtoken';

interface UserJwtPayload {
    jti: {
        id: string,
        username: string,
        email: string
    },
    iat: number
}

export const getJwtSecret = () => {
    const secret = process.env.TOKEN_SECRET;

    if(!secret || secret.length === 0) {
        throw new Error("The environment variable 'TOKEN_SECRET' is not set");
    }

    return secret;
}

export const verifyAuth = async (token: string) => {
    try {
        const verified = await jwtVerify(token, new TextEncoder().encode(getJwtSecret()));
        return verified.payload as JwtPayload;
    } catch (error) {
        throw new Error("Token has expired");
    }
}
