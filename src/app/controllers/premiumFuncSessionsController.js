import jwt from 'jsonwebtoken'
import UserModel from '../models/UserModel.js'
async function premiumFuncSessionsController(req, res, next){
    const token = req.cookies.jwt_token
    
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
        return res.json({MSG: "Voce precisa realizar login"})
    }
}
    
export default premiumFuncSessionsController