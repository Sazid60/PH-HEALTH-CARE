import jwt, { Secret, SignOptions } from "jsonwebtoken";
const generateToken = (payload: any, secret: Secret, expiresIn: string) => {
    //  generate access token 
    const token = jwt.sign(payload, secret, {
        algorithm: "HS256",
        expiresIn
    } as SignOptions
    )

    return token
}

export const jwtHelper ={
    generateToken
}