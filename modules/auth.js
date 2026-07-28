const fm = require("./fileManager");
const bcrypt = require("bcrypt");


/*
register
login
*/

const register = async function (userName ,email ,password , isAdmin = false) {
    try {
        if (!userName.trim()) {
            throw new Error("Name is required.");
        }

        if(!email.trim())
        {
            throw new Error('Invalid email address');
        }

        if (password.length < 8) {
            throw new Error('Password must be at least 8 characters');

        }
        const users =  fm.readUsers();
        email = email.toLowerCase().trim();
        const emailExists = users.find(user => user.email === email);
        if (emailExists) {
            throw new Error("Email already exists.");
        }
            const hashedPassword = await bcrypt.hash(password, 10);
            const lastId = users.length > 0
                ? Math.max(...users.map(user => user.id))
                : 0;
            const newUser = {
                id: lastId + 1,
                name: userName,
                email,
                password: hashedPassword,
                isAdmin,
            }

            users.push(newUser);
            fm.writeUsers(users);
            const {  password: hashedPasswordField, ...safeUser } = newUser;
            return safeUser;

    }catch(err){
        console.error(err.message);
        return null;
    }

}

const login = async function(email ,password){

    try{
    const users =  fm.readUsers();
    email = email.toLowerCase().trim();
    const user = users.find(user => user.email === email);

    if (!email.trim()) {
        throw new Error("Email is required.");
    }

    if (!password.trim()) {
        throw new Error("Password is required.");
    }

    if(!user){
        throw new Error(`Invalid email or password`);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid email or password.");
    }

    return user;

    }catch(err){
        console.error(err.message);
        return null;
    }
}

module.exports = {
    register,
    login,
};