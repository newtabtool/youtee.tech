import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
async function ExtensionSessionsController(req, res, next){
    const token = req.params.token
    if(!token) return res.json({MSG: "Voce precisa realizar login"})

    try{
        const userLoged = jwt.verify(token, process.env.JWT_SECRET)
        req.user = userLoged
        req.id = userLoged.id
        const verifyUserPremium = await UserModel.findOne({_id:userLoged.id})
        if(verifyUserPremium.premium === false){
            return res.json({premium:false})
        }
        next()

    }catch(err){
        sendErrorNotification(error.toString()+"\n \n \n extensionSessionController linha 18");
        return res.json({MSG: "Voce precisa realizar login"})

    }
}
    
export default ExtensionSessionsController