const userService = require("../services/user");
const {z} = require("zod");
const UserSchema = z.object({
    phone : z.string().min(10).max(10),
    name : z.string()
});
const getUsers = async(req,res) =>{
    const data = await userService.getUsers();
    res.json(data);
};
const createUser = async(req,res) =>{
    const result = await UserSchema.safeParse(req.body);
    if(!result.success){
        return res.status(400).json({
            errors : "inapt data" ,
        });
    }
    const user = await userService.createUser(req.body);
    res.status(201).json({
        success : true,
        data : user
    });
};
const getUserById = async(req,res) =>{
    const {id} = req.params;
    const user = await userService.getUserById(id);
    res.json({
        success : true,
        data : user
    });
};
const updateUser = async(req,res) => {
    const {id} = req.params;
    const updatedUser = await userService.updateUser(id,req.body);
    res.json({
        success : true,
        data : updatedUser
    });
};
const deleteUser = async(req,res) => {
    const {id} = req.params;
    const deleteduser = await userService.deleteUser(id);
    res.json({
        success : true,
        data : deleteduser
    });
}
module.exports = {
    getUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
};