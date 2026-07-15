const prisma = require("../config/prisma");
const getUsers = async () =>{
    const users = await prisma.user.findMany(); 
    return {
        success : true,
        data : users 
    };
};
const createUser = async(data) => {
    const user = await prisma.user.create({
        data
    });
    return user;
}
const getUserById = async(id) =>{
    const user = await prisma.user.findUnique({
        where : {
            id
        }
    });
    return user;
}
const updateUser = async(id,data) =>{
    const updatedUser = await prisma.user.update({
        where : {
            id
        },
        data
    });
    return updatedUser;
};
const deleteUser = async(id) => {
    const deleteduser = await prisma.user.delete({
        where :{
            id
        }
    });
    return deleteduser;
}
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};