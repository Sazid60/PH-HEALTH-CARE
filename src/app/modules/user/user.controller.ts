import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";

const createPatient = catchAsync(async (req: Request, res: Response) => {
    // console.log("Patient Created! ", req.body)
    const result = await UserService.createPatient(req)

    // console.log(req.body)

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Patient Created Successfully",
        data: result
    })
})


const createAdmin = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createAdmin(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Admin Created successfully!",
        data: result
    })
});

const createDoctor = catchAsync(async (req: Request, res: Response) => {

    const result = await UserService.createDoctor(req);
    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "Doctor Created successfuly!",
        data: result
    })
});

const getAllFromDB = catchAsync(async (req: Request, res: Response) => {
    const { page, limit } = req.query
    const result = await UserService.getAllFromDB({ page: Number(page), limit: Number(limit) })
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Retrieved Successfully",
        data: result
    })
})



export const UserController = {
    createPatient,
    createAdmin,
    createDoctor,
    getAllFromDB
}