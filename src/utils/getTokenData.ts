// import { NextRequest } from "next/server";
// import jwt, { JwtPayload } from 'jsonwebtoken'

// type TokenData = {
//     id: string,
//     username: string,
//     email: string
// }

// export const getTokenData = (request: NextRequest) => {
//     try {
//         const encodedToken = request.cookies.get('token')?.value || '';
//         const decodedToken:JwtPayload = jwt.verify(encodedToken, process.env.TOKEN_SECRET!) as JwtPayload;
//         return ({
//             username: decodedToken.username,
//             id: decodedToken.id,
//             email: decodedToken.email
//         })
//     } catch (error: any) {
//         throw new Error(error.message);
//     }
// }