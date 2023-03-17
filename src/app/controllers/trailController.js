import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import User from '../models/UserModel.js';
import TrailModel from '../models/TrailModel.js';
import VideoModel from '../models/VideoModel.js'



function con(msg){
    console.log(msg);
}
class trailController{

    async create(req,res) {
        const userId = req.id
        const { name, type, description } = req.body;
        const tags = []
        const likes = 0;
        let publik;
        if(type === 'public'){
            publik = true
        }else{
            publik = false
        }
        console.log(name, description, type, userId, likes, tags)
        const verifyName = await TrailModel.find({name: name, creator: userId})
        if(verifyName.length > 0){
            return res.status(400).redirect('/trail')
        }

     let create = await TrailModel.create({ 
        creator: userId,
        publik: publik,
        name: name,
        description: description,
        likes: likes,
        tags: tags
    }).then((saved)=>{
        const id = saved._id
        res.status(200).redirect(`/trail/${id}`)
    }).catch((error)=>{
        console.log(error)
    }) 

}


    async getTrail(req,res){
        const id = req.params.id
        const trail = await TrailModel.findById(id)

        res.status(200).json({trail: trail})
    }

    /* async testTrailName(req,res){
        const name = req.body.name;
        const trail = await TrailModel.find({name: name, creator: req.id})
        if (trail.length > 0 ){
            return res.status(200).json({valid: false})
        }else{
            return res.status(200).json({valid: true})

        }
    } */

    async testTrailName(req,res){
        const { name }  = req.body;
        const trail = await TrailModel.find({name: name, creator: req.id})
        console.log(name)
        console.log(trail)
        console.log(trail.length)

        if (trail.length > 0 ){
            return res.status(200).json({valid: false})
        }else{
            return res.status(200).json({valid: true})

        }
    }

    async saveNote(req,res){
        const videoId = req.body.id
        const note = req.body.note;
        console.log(note, videoId)

        const save = await VideoModel.findByIdAndUpdate({_id: videoId}, { notes: note})
        .then(res.status(200).send({msg: "success"}))
        .catch(
            (eror)=>{
            console.log(eror)
        res.status(400).send({msg: "error"})
        })

        
        
    }

    async changeV(req,res){
    con("Entrou na função de modificar")
        const trailId = req.params.id
        con(trailId)
        

        const verifyTrailAuthor = await TrailModel.findOne({_id: trailId})
        con("iniciou Verificou o autor")
        con(req.id)
        if(verifyTrailAuthor && verifyTrailAuthor.creator === req.id){
            console.log("verificado")
            let visibility = verifyTrailAuthor.publik;
            con("original:  " + visibility)
            visibility = !visibility;
            con("Mudado:  " + visibility)
            let change = await TrailModel.findOneAndUpdate({_id: trailId}, { publik: visibility}).then((ok)=>{
                console.log(ok)
                return res.status(200).json({ visibility: visibility})
            }).catch((err) => {
                console.log(err)
                return res.status(400).send(err)
            }
                )
        }else{
            return res.status(400).send({msg: "Bad Request"})
        }
    }




    

}
export default new trailController()
