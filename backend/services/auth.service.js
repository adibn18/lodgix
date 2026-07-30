const { success } = require("zod");
const {generateAccessToken, generateRefreshToken} = require("../utils/jwt");
const prisma = require("../config/prisma");
const jwt = require("jsonwebtoken");

const sendOtp = async({phone}) =>{
    const code = Math.floor(100000 + Math.random()*900000).toString();
    const expiresAt = new Date(Date.now() + 5*60*1000);
    await prisma.oTP.create({
        data : {
            phone,
            code,
            expiresAt,
        },
    });
    console.log(`OTP for ${phone} : ${code}`);
    return {
        success : true,
        message : "OTP sent successfully",
    };
};

const verifyOtp = async({phone , code}) =>{
    const otp = await prisma.oTP.findFirst({
        where : {
            phone ,
        },
        orderBy : {
            createdAt : "desc",
        },
    });
    if(!otp){
        throw new Error("OTP not found");
    }
    if(otp.code !== code){
        throw new Error("OTP mismatch");
    }
    if(otp.expiresAt < new Date()){
        throw new Error("OTP expired");
    }
    await prisma.oTP.update({
        where : {
            id : otp.id,
        },
        data : {
            verified : true,
        },
    });
    let user = await prisma.user.findUnique({
        where : {
            phone,
        }
    });
    if(!user){
        user = await prisma.user.create({
            data : {
                phone,
            },
        });
    }
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    await prisma.refreshToken.create({
        data : {
            token : refreshToken,
            userId : user.id,
            expiresAt : new Date(Date.now() + 7*24*60*60*1000),
        },
    });
    return {
        success : true,
        accessToken,
        refreshToken,
    };
};

module.exports = {
    sendOtp,
    verifyOtp,
};