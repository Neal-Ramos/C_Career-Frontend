import { notification } from "antd"
import axios from "axios"


interface errorReponse{
    statusCode: number
    errorCode: string
    message: string
    timestamp: string
}

export const handleError = (error: unknown) => {
    if(axios.isAxiosError<errorReponse>(error)){
        const errMessage = error.response?.data.message||"Something Went Wrong!"
        switch (error.status){
            case 400:{
                notification.warning({title: `Invalid Input`, description: errMessage})
                return
            }
            case 401:{
                notification.warning({title: `Unauthorize`, description: errMessage})
                return
            }
            case 404:{
                notification.warning({title: `Data Did Not Found`, description: errMessage})
                return
            }
            case 409:{
                notification.warning({title: `Data Conflict`, description: errMessage})
                return
            }
            default :{
                notification.error({title: `Something Went Wrong`, description: "Something Went Wrong at our End"})
            }
        }
    }
}