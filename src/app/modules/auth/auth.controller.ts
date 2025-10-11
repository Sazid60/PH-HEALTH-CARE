import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";

import sendResponse from "../../shared/sendResponse";
import { AuthServices } from "./auth.service";

const login = catchAsync(async (req: Request, res: Response) => {

    const result = await AuthServices.login(req.body)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User Logged In Successfully",
        data: result
    })
})


export const AuthController = {
    login
}