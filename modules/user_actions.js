const fm = require("./fileManager");
const { register, login } = require("./auth");
const bcrypt = require("bcrypt");

// getUserById
const getUserById =  function(userId){
    try{
        const users =  fm.readUsers();
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
const getAllUsers = function(){
     let users = fm.readUsers();
     users = users.map(user =>{
        const { password: hashedPasswordField , ...newUser} = user;
        return newUser;
    });

    return users;
}

// updateUser
const updateUser =  function(userId, updatedData){
    const users = fm.readUsers();
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
    fm.writeUsers(users);
    const { password: hashedPasswordField, ...safeUser} = users[index];

    return safeUser;
}
// deleteUser
const deleteUser = function(userId){
    const users = fm.readUsers();

    const updatedUsers = users.filter(user => user.id !== userId);
    if (updatedUsers.length === users.length)
        return null;

    fm.writeUsers(updatedUsers);
    return true;

}




module.exports = {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
}







