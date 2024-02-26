const {validationResult}=require("express-validator");
module.exports=(req,res,next)=>{
    let result=    validationResult(req);
    if(result.errors.length>=1)
    {
        let error_msgs=result.errors.reduce((current,err)=>current+err.msg+" , ","");
        let error=new Error(error_msgs);
        error.status=422;
        next(error);
    }
    else
    next();
}