import { z } from "zod";

export const infoRegistertype = z.object({
    firstname: z.string(),
    lastname : z.string(),
    username: z.string(),
    age : z.number(),
    city: z.string(),
    email: z.string().email()
    


})


