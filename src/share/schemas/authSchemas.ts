import * as z from "zod";
import { schemaErrors } from "./schemaErrors";

export const loginSchema = z.object({
    email: z.string().email(schemaErrors.email),
    password: z.string().min(5, schemaErrors.password),
});

export const registerSchema = z.object({
    email: z.string().email(schemaErrors.email),
    password: z.string().min(5, schemaErrors.password),
    repassword: z.string().min(5, schemaErrors.repassword),
});