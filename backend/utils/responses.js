export const ErrorResponse = (res,status,message="Internal Server Error") => {
    return res.status(status).json({
        success:false,
        message:message
    })
}

export const SuccessResponse = (res,status,message,data=null) => {
    return res.status(status).json({
        success:true,
        message:message,
        data:data
    })
}