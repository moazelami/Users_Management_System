const { register, login } = require("./modules/auth");
const {
    getUserById,
    getAllUsers,
    updateUser,
    deleteUser
} = require("./modules/user_actions");

const {
    changePassword,
    updateProfile
} = require("./modules/profile");

async function main() {

    console.log("========== REGISTER ==========");

    const newUser = await register(
        "Ali Mohamed",
        "ali@gmail.com",
        "12345678"
    );

    console.log(newUser);

    console.log("\n========== LOGIN ==========");

    const loggedUser = await login(
        "ali@gmail.com",
        "12345678"
    );

    console.log(loggedUser);

    console.log("\n========== GET USER ==========");

    console.log(getUserById(1));

    console.log("\n========== GET ALL USERS ==========");

    console.log(getAllUsers());

    console.log("\n========== UPDATE USER ==========");

    console.log(
        updateUser(1, {
            name: "Moaz Wael Elami",
            isAdmin: true
        })
    );

    console.log("\n========== UPDATE PROFILE ==========");

    console.log(
        updateProfile(1, {
            name: "Moaz",
            email: "moaz@gmail.com",
            isAdmin: false, // المفروض يتتجاهل
        })
    );

    console.log("\n========== CHANGE PASSWORD ==========");

    console.log(
        await changePassword(
            1,
            "99999999",
            "11111111"
        )
    );

    console.log("\n========== DELETE USER ==========");

    console.log(deleteUser(4));

    console.log("\n========== USERS AFTER DELETE ==========");

    console.log(getAllUsers());

}

main();



