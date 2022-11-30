const UsersMongoDB = require("../../classes/users/ContainerUsersMongoDB");
const userSchema = require("../../models/users.model");

class UsersDaoMongoDB extends UsersMongoDB{
    constructor(){
        super('usuarios', userSchema )
    }
}

module.exports = UsersDaoMongoDB