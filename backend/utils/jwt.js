const jwt = require("jsonwebtoken");
const generateAccessToken = (user) =>{
    const accessToken = jwt.sign({
            id : user.id,
            role : user.role,
        },process.env.JWT_SECRET,{
            expiresIn : process.env.JWT_EXPIRES_IN,
        }
    );
    return accessToken;
};

const generateRefreshToken = (user) =>{
    const refreshToken = jwt.sign({
            id : user.id,
        },process.env.JWT_SECRET,{
            expiresIn : process.env.REFRESH_TOKEN_EXPIRES_IN,
        }
    );
    return refreshToken;
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
}