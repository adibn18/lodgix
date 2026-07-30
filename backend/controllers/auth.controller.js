const authService = require("../services/auth.service");
const {sendOtpSchema, verifyOtpSchema, refreshTokenSchema} = require("../middleware/auth.validation");

const sendOtp = async(req,res,next) =>{
    try{
        const data = sendOtpSchema.parse(req.body);
        const response = await authService.sendOtp(data);
        res.status(200).json(response);
    }catch(err){
        next(err);
    }
}

const verifyOtp = async(req,res,next) =>{
    try{
        const data = verifyOtpSchema.parse(req.body);
        const response = await authService.verifyOtp(data);
        res.status(200).json(response);
    }catch(err){
        next(err);
    }
}

const refreshToken = async(req,res,next) => {
    try{
        const data = refreshTokenSchema.parse(req.body);
        const response = await authService.refreshToken(data);
        res.status(200).json(response);
    }catch(err){
        next(err);
    }
}

module.exports = {
    sendOtp,
    verifyOtp,
    refreshToken,
};

