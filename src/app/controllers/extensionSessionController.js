import jwt from 'jsonwebtoken'
async function ExtensionSessionsController(req, res, next){
    const token = req.params.token
    if(!token) return res.json({MSG: "Voce precisa realizar login"})

    try{
        const userLoged = jwt.verify(token, process.env.JWT_SECRET)
        req.user = userLoged
        req.id = userLoged.id
        next()

    }catch(err){
        return res.json({MSG: "Voce precisa realizar login"})
    }
}
    
export default ExtensionSessionsController