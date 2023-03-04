import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';

async function checkSignup(email, password) {
    //console.log(email)

    if (!email || !password) {
        console.log('campo vazio')
        return false
    }

    if (password.length < 8) {
        console.log('senha pequena')
        return false
    }

    const user = await User.find({ email: email })
    //console.log(user)
    if (user.length > 0) {
        return false
    }
    
    return true

}

export default checkSignup
