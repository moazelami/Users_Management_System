const fs = require ('node:fs');


function readUsers() {

    return JSON.parse(
        fs.readFileSync("./data/data.json", "utf8")
    );

}

function writeUsers(users) {

    fs.writeFileSync(
        "./data/data.json",
        JSON.stringify(users, null, 4)
    );

}

module.exports = {
    readUsers,
    writeUsers,
}

