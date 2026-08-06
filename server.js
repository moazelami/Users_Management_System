
const http = require('node:http');
const sendResponse = require('./utils/sendResponse');
const userManager = require('./modules/user_actions');
const auth = require('./modules/auth');
const profile = require('./modules/profile');
const server = http.createServer((req, res) => {
    const {url , method} = req;
    if(url ==='/users' && method === 'GET'){
        try {
            const users = userManager.getAllUsers();
            return sendResponse(res ,200 , true ,"Users retrieved successfully." ,users);
        }catch (err){
            return sendResponse(res ,500 , false ,err.message);
        }
    }else if(url.startsWith('/users') && method === 'GET'){
        const id = url.split('/')[2];
        try{
            if(!id){
                return sendResponse(res ,400 , false , "Invalid id.");
            }
            const user = userManager.getUserById(id);
            if(!user){
                return sendResponse(res ,404 , false , "User not found");
            }
            return sendResponse(res ,200 , true , "done" , user);
        }catch(err){
            return sendResponse(res ,500 , false ,err.message);
        }
    }else if(url === '/register' && method === 'POST'){
        let body  = '';
        req.on('data', (chunk) => {
            body += chunk;
        })
        req.on('end',  async () => {
            try {
                const data = JSON.parse(body);
                const newUser = await auth.register(
                    data.name,
                    data.email,
                    data.password,
                    data.isAdmin
                );
                if (!newUser) {
                    return sendResponse(res, 401, false, "User not created");
                }
                return sendResponse(res, 200, true, "User registered successfully.");

            } catch (err) {
                return sendResponse(res, 500, false, err.message);
            }
        })
    }else if(url === '/login' && method === 'POST') {
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const user = await auth.login(
                    data.name,
                    data.email,
                    data.password,
                );
                if (!user) {
                    return sendResponse(res, 401, false, 'user Not found');
                }
                return sendResponse(res, 200, true, "logged in successfully");
            } catch (err) {
                return sendResponse(res, 500, false, err.message);
            }
        })
    }else if (url.startsWith('/users') && method === 'PUT'){
        const id = url.split('/')[2];
        if(!id){
            return sendResponse(res ,401 , false , "invalid id");
        }
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', () => {
            try{
                const data = JSON.parse(body);
                const updatedUser = userManager.updateUser(
                    id,
                    {
                        name: data.name,
                        email: data.email,
                        isAdmin: data.isAdmin,
                    }
                );
                if(!updatedUser){
                    return sendResponse(res ,401 , false , "User not updated");
                }
                return sendResponse(res ,200 , true , "user updated successfully");

            }catch (err){
                return sendResponse(res ,500 , false ,err.message);
            }
        })
    }else if(url.startsWith('/users') && method === 'DELETE'){
        const id = url.split('/')[2];
        if(!id){
            return sendResponse(res ,401 , false , "invalid id");
        }
        try {
            const delUser = userManager.deleteUser(id);
            if(!delUser){
                return sendResponse(res ,401 , false , "User not deleted");
            }
            return sendResponse(res ,200 , true , "user Deleted successfully.");
        }catch (err){
            return sendResponse(res ,500 , false ,err.message);
        }
    }else if (url.startsWith('/user/password') && method === 'PATCH') {
        const id = url.split('/')[3];
        if (!id) {
            return sendResponse(res, 404, false, "invalid id");
        }
        let body = '';
        req.on('data', (chunk) => {
            body += chunk;
        });
        req.on('end', async () => {
            try {
                const data = JSON.parse(body);
                const updatedPassword = await profile.changePassword(
                    id,
                    data.oldPassword,
                    data.newPassword,
                );
                if (!updatedPassword) {
                    return sendResponse(res, 409, false, "password not changed");
                }
                return sendResponse(res, 200, true, "password changed");
            } catch (err) {
                return sendResponse(res, 500, false, err.message);
            }
        })
    }else{
        return sendResponse(res,404,false ,
            "Route not found");
    }
});

server.listen(3000 , ()=>{
    console.log(`Server listening on port 3000....`);
})



