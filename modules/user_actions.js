const fm = require("./fileManager");

// getUserById
const getUserById = async function(userId){
    try{
        const users = await fm.readUsers();
        const user = users.find(user => user.id === userId);

        if (!user)
            return null;

        const{ password: hashedPasswordField, ...safeUser} = user;
        return safeUser;
    }catch(err){
        console.error(err.message);
        return null;
    }
}

// getAllUsers
const getAllUsers = async function(){
     let users = await fm.readUsers();
     users = users.map(user =>{
        const { password: hashedPasswordField , ...newUser} = user;
        return newUser;
    });

    return users;
}

// updateUser
const updateUser = async function(userId, updatedData){
    const users = await fm.readUsers();
    const user = users.find(user => user.id === userId);

    if (!user)
        return null;

    const index = users.findIndex(user => user.id === userId);
    if(index === -1) return null;

    delete updatedData.id;
    delete updatedData.password;

    users[index] = {
        ...users[index],
        ...updatedData
    }
    await fm.writeUsers(users);
    const { password: hashedPasswordField, ...safeUser} = users[index];

    return safeUser;
}
// deleteUser
const deleteUser = async function(userId){
    const users = await fm.readUsers();

    const updatedUsers = users.filter(user => user.id !== userId);
    if (updatedUsers.length === users.length)
        return null;

    await fm.writeUsers(updatedUsers);
    return true;

}




module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}







