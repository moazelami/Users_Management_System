const express = require('express');
const app = express();
const userManager = require('./modules/user_actions');
const auth = require('./modules/auth');
const profile = require('./modules/profile');
app.use(express.json());
const PORT = 3000;
app.get('/users', async (req, res) => {
    try {
        const users = await userManager.getAllUsers();
        return res.status(200).json({
                success: true,
                message: 'Users retrieved successfully.',
                data: users
            });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

app.get('/users/:id', async (req, res) => {
    const id = req.params.id;
    try{
        const user = await userManager.getUserById(id);
        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User retrieved successfully.",
            data: user
        });
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });    }
});

app.post('/register', async (req, res) => {
    const {name , email , password , isAdmin} = req.body;
    try {
        const newUser = await auth.register(
            name,
            email,
            password,
            isAdmin,
        );
        if (!newUser) {
            return res.status(400).json({
                success: false,
                message: "User not created"
            });
        }
        return res.status(201).json({
            success: true,
            message: "User registered successfully.",
            data: newUser
        });

    }catch (err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

app.post('/login', async (req, res) => {
    const {email , password} = req.body;
    try{
            const user = await auth.login(
                email,
                password,
            );

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Logged in successfully",
            data: user
        });
    } catch (err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

app.put('/users/:id', async (req, res) => {
    const id = req.params.id;
    const {name , email , isAdmin} = req.body;
    try{
        const updatedUser = await userManager.updateUser(
            id,
            {
                name,
                email,
                isAdmin,
            }
        );

        if(!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
            return res.status(200).json({
                success: true,
                message: "User updated successfully.",
                data: updatedUser
            });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

app.delete('/users/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const delUser = await userManager.deleteUser(id);
        if(!delUser){
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }
        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });
    }catch (err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

app.patch('/users/password/:id', async (req, res) => {
    const id = req.params.id;
    const {oldPassword , newPassword} = req.body;
    try{
        const updatedPassword = await profile.changePassword(
            id,
            oldPassword,
            newPassword,
        );
        if (!updatedPassword) {
            return res.status(400).json({
                success: false,
                message: "Password not changed"
            });        }
        return res.status(200).json({
            success: true,
            message: "Password changed successfully."
        });

    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message
        });
    }
});

app.listen(PORT , ()=>{
    console.log(`Server listening on port ${PORT}....`);
});
