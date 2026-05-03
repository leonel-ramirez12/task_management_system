export const asynchandler=(fun)=>{
return (req,res,next)=>{
    fun(req,res,next).catch(error=>{
        error.status=500;
        return next(error)
    })
}
}
export const globalErrorHandling=(error,req,res,next)=>{
    const statusCode = error.cause||500;
    if (process.env.MOOD === "DEV"){
        return res.status(statusCode).json({
            message: error.message,
            error,
            stack: error.stack
        });
    }
    return res.status(statusCode).json({
        message: error.message,
        error
    });
};
