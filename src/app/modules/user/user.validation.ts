import z from "zod";

const createPatientValidationSchema = z.object({
    password: z.string(),
    patient: z.object(
        {
            name: z.string().nonempty("Name is Required"),
            email: z.string().nonempty("Email Is Required"),
            address: z.string().optional()
        }
    )
})

export const UserValidation = {
    createPatientValidationSchema
}