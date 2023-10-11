import { z } from "zod";

const USER_SCHEMA = z.object({
    name: z.string({
        invalid_type_error: "User name must be a string"
    }),
    email: z.string({
        invalid_type_error: "User email must be a string"
    }),
    role: z.string({
        invalid_type_error: "User role must be a string"
    }),
    password: z.string({
        invalid_type_error: "User password must be a string"
    })
});

export default USER_SCHEMA;