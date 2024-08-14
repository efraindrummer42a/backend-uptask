import { CorsOptions } from 'cors'

export const corsConfig: CorsOptions = {
    credentials: true,
    origin: function(origin, callback){
        const whitelist = [process.env.FRONTEND_URL]

        if(!origin || whitelist.includes(origin)){
            callback(null, true)
        }else{
            callback(new Error('Error del cors'))
        }
    }
}