import { UserStatus } from "@prisma/client"
import { prisma } from "../../shared/prisma"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import { jwtHelper } from "../../helper/jwtHelper";

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
    const accessToken = jwtHelper.generateToken({email: user.email, role: user.role}, "abc","1h")

    // generate refresh token 
        const refreshToken = jwtHelper.generateToken({email: user.email, role: user.role}, "abc","90d")


    return {
        accessToken,
        refreshToken,
        needPasswordChange : user.needPasswordChange
    }
}

export const AuthServices = {
    login
}