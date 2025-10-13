import { Request, Response } from "express";
import catchAsync from "../../shared/catchAsync";
import { UserService } from "./user.service";
import sendResponse from "../../shared/sendResponse";
import pick from "../../helper/pick";
import { userFilterableField } from "./user.contant";

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
    // common  -> page page, limit, sortBy, sortOrder, --> pagination, sorting
    // random -> fields , searchTerm --> searching, filtering 

    // const filters = pick(req.query, ["status", "role", "email", "searchTerm"])

    // const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])

    const filters = pick(req.query, userFilterableField)

    const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"])




    // const { page, limit, searchTerm, sortBy, sortOrder, role, status } = req.query
    const result = await UserService.getAllFromDB(filters, options)
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "User Retrieved Successfully",
        meta : result.meta,
        data: result.data
    })
})



export const UserController = {
    createPatient,
    createAdmin,
    createDoctor,
    getAllFromDB
}