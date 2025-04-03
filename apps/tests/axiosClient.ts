import axios from "axios"

export const axiosClient = {
    post: async (...args : Parameters<typeof axios.post>) => {
        try {
            const res = await axios.post(...args)
            return res
        } catch(e : any) {
            return e.response

        }
    },
    get: async (...args :Parameters<typeof axios.get>) => {
        try {
            const res = await axios.get(...args )
            return res
        } catch(e: any) {
            return e.response

        }
    },
    put: async (...args :Parameters<typeof axios.put>) => {
        try {
            const res = await axios.put(...args)
            return res
        } catch(e : any) {
            return e.response

        }
    },
    delete: async (...args :Parameters<typeof axios.delete>) => {
        try {
            const res = await axios.delete(...args)
            return res
        } catch(e : any) {
            return e.response

        }
    },
}
