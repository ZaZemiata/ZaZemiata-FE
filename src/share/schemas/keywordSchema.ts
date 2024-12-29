import * as z from "zod";
import { schemaErrors } from "./schemaErrors";

export const addKeywordSchema = z.object({
    word: z.string().min(3, schemaErrors.word),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "CRITICAL"], {
        errorMap: () => ({ message: schemaErrors.priority }),
    }),
    active: z
        .boolean()
        .nullable()
        .refine((value) => value !== null, {
            message:schemaErrors.active,
        }),
});