import jwt from 'jsonwebtoken'
async function SessionsController(req, res, next){
    const token = req.cookies.jwt_token
    //console.log(token)
    if(!token) return res.status(200).redirect('/welcome')

    try{
        const userLoged = jwt.verify(token, process.env.JWT_SECRET)
        
        req.user = userLoged
        req.id = userLoged.id
        next()

    }catch(err){
        return res.status(401).redirect('/auth/login')
    }
}
    
export default SessionsController