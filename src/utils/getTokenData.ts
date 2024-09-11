import { NextRequest } from "next/server";
import jwt, { JwtPayload } from 'jsonwebtoken'

type TokenData = {
    id: string,
    username: string,
    email: string
}

export const getTokenData = (request: NextRequest) => {
    try {
        const encodedToken = request.cookies.get('token')?.value || '';
        const decodedToken:JwtPayload = jwt.verify(encodedToken, process.env.TOKEN_SECRET!) as JwtPayload;
        return ({
            username: decodedToken.username,
            id: decodedToken.id,
            email: decodedToken.email
        })
    } catch (error: any) {
        throw new Error(error.message);
    }
}

// export const getTokenData = (req: NextRequest): TokenData | null => {
//     try {
//       const cookieValue = req.cookies.get("token")?.value ?? "";
//       const decodedToken: JwtPayload = jwt.verify(cookieValue, process.env.TOKEN_SECRET!);
//       return {
//         username: decodedToken.username,
//         id: decodedToken.id,
//         email: decodedToken.email
//       };
//     } catch (error: any) {
//       console.log(`Error verifying token: ${error}`);
//       return null;
//     }
//   };