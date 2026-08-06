const fm = require("./fileManager");
const user_actions = require("./user_actions");
const bcrypt = require("bcrypt");


//changePassword
const changePassword = async function(userId , oldPassword , newPassword) {
    try {

        const users = fm.readUsers();
        const index = users.findIndex(user => user.id === userId);

        if (index === -1)
            return null;

        const isMatch = await bcrypt.compare(oldPassword, users[index].password);
        if (!isMatch)
            throw new Error("Invalid password.");

        if (!newPassword.trim())
            throw new Error("Password is required.");

        if (newPassword.length < 8)
            throw new Error("Password must be at least 8 characters.");

        if (oldPassword === newPassword)
            throw new Error("New password must be different from old password.");

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        users[index].password = hashedPassword
        fm.writeUsers(users);

        return true;
    }catch (err){
        console.error(err.message);
        return null;
    }


}
//updateProfile

const updateProfile = function (userId, updatedData) {
    const safeData = { ...updatedData };

    delete safeData.id;
    delete safeData.isAdmin;
    delete safeData.password;

    return user_actions.updateUser(userId, safeData);
}

module.exports = {
    changePassword,
    updateProfile,
}