import { UserStatus } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

const login = async (payload: { email: string, password: string }) => {
    console.log(payload)
    const user = await prisma.user.findUniqueOrThrow({
        where: {
            email: payload.email,
            status: UserStatus.ACTIVE
        }
    })

    console.log(user)

    const isCorrectPassword = await bcrypt.compare(payload.password, user.password)

    if(!isCorrectPassword){
        throw new Error("Password Incorrect")
    }
    //  generate access token 
    const accessToken = jwt.sign({email: user.email, role: user.role}, "abc", {
        algorithm:"HS256",
        expiresIn :"1h"
    })

    // generate refresh token 
        const refreshToken = jwt.sign({email: user.email, role: user.role}, "abc", {
        algorithm:"HS256",
        expiresIn :"90d"
    })


    return {
        accessToken,
        refreshToken
    }
}

export const AuthServices = {
    login
}