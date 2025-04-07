import axios from "axios"

const backend_url = process.env.EXPO_PUBLIC_BACKEND_URL



class onboardingService {

    async  basicInfoRegister(data: any) {
        console.log(backend_url);
        const age = parseInt(data.age)
      try{
        const newUser = await axios.post(`${backend_url}/api/v1/onboarding/basicInfo` , {
            firstname : data.firstname,
            lastname : data.lastname,
            username :data.username,
            city : data.city,
            age : age,
            email : data.email
        })
        if(newUser)
        {
            return newUser
        }

      }
      catch(e)
      {
        console.log(e);
        return null
        
      }
        

    }
}

export const onBoardingService = new onboardingService()
