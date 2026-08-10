const fs = require ('node:fs/promises');


let readUsers = async function () {

    return JSON.parse(
        await fs.readFile("./data/data.json", "utf8")
    );

}

let writeUsers = async function (users) {

    await fs.writeFile(
        "./data/data.json",
        JSON.stringify(users, null, 4)
    );

}

module.exports = {
    readUsers,
    writeUsers,
}

