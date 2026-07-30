const {z} = require("zod");
const sendOtpSchema = z.object({
    phone : z.string().regex(/^[6-9]\d{9}$/,"Invalid phone number"),
});
const verifyOtpSchema = z.object({
    phone : z.string().regex(/^[6-9]\d{9}$/,"Invalid phone number"),
    code : z.string().length(6,"OTP must be 6 digits"), 
});
const refreshTokenSchema = z.object({
    refreshToken : z.string(),
});
module.exports = {
    sendOtpSchema,
    verifyOtpSchema,
    refreshTokenSchema,
};