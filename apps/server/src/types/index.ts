import { z } from "zod";

export const basicOnboardingInfo = z.object({
    firstname: z.string(),
    lastname : z.string(),
    username: z.string(),
    age : z.number(),
    city: z.string(),
    email: z.string().email()
    


})

export const footballProfileRegister = z.object({
    userId : z.number(),
    role : z.string(),
    experience : z.string(),
    nickname: z.string()
})


export const footballTeamCreate = z.object({
    name: z.string(),
    location: z.string(),
    createdByUserId: z.number(),
    maxPlayers : z.number(),
    playerIds: z.array(z.number())
})
