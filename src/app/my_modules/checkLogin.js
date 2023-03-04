import bcrypt  from 'bcryptjs';
import User from '../models/UserModel.js';
async function checkLogin(email, password) {
    if(!email || !password){
        return false
    }
    const user = await User.findOne({email})
    if(!user){
        return false
    }
    const isMatch = await bcrypt.compare(password, user.password)
    if(!isMatch){
        return false
    }
    
    return true;
}

export default checkLogin
