const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config();

const hashPassword = async (password) =>{
    try{
        const hashedPassword = await bcrypt.hash(password,parseInt(process.env.SALT_ROUNDS));
        return hashedPassword;
    }
    catch(error){
        console.log(error);
    }
}

const compare_hashed_passwords = async (passwordInput,storeHashedPassword) => {
    try{
        return await bcrypt.compare(passwordInput,storeHashedPassword);
    }
    catch(error){
        console.log(error);
    }
}

module.exports = {
    hashPassword,
    compare_hashed_passwords
}