import { axiosClient } from "./axiosClient"


describe("Onboarding registrations" , () => {

    test("User is able to register the basic info" , async () => {

        const firstname = "rishabh" + Math.random()
        const lastname = "tyagi"  + Math.random()
        const username = "newUser" + Math.random()
        const age = 23
        const city ="ghaziabad"
        const email = "rishabh@email.com"

        const response = await axiosClient.post("http://localhost:3000/api/v1/onboarding/basicInfo", {
            firstname,
            lastname, 
            username,
            age,
            city,
            email
        })
        console.log(response.data);
        
        expect(response.status).toBe(200)

    })
})