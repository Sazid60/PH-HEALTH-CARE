import jwt, { JwtPayload, Secret, SignOptions } from "jsonwebtoken";
const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
    //  generate access token 
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn
    } as SignOptions
    )

    return token
}

const verifyToken = (token: string, secret: Secret) => {
    return jwt.verify(token, secret) as JwtPayload
}

export const jwtHelper = {
    generateToken,
    verifyToken
}