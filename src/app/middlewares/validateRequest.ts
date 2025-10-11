import { NextFunction, Request, Response } from "express";
import { ZodObject } from "zod";

const validateRequest = (schema: ZodObject) => async (req: Request, res: Response, next: NextFunction) => {
    try {
        await schema.parseAsync({
            body: req.body
        })
        return next() // this will pass to the next middleware or lastly will go to the controller if no more middleware 
    } catch (error) {
        next(error)
    }
}

export default validateRequest