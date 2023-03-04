import express from 'express'
const router = express.Router()
import bcrypt from 'bcryptjs'
import User from '../models/UserModel.js';
import TrailModel from '../models/TrailModel.js';



class trailController{

    async create(req,res) {
        const userId = req.id
        const { name, type, description } = req.body;
        const videos = []
        const tags = []
        const likes = 0;
        let publik;
        if(type === 'public'){
            publik = true
        }else{
            publik = false
        }
        console.log(name, description, type, userId, likes, videos, tags)
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
        videos: videos,
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
        res.status(200).json(trail)
    }

    async testTrailName(req,res){
        const name = req.body.name;
        const trail = await TrailModel.find({name: name, creator: req.id})
        if (trail.length > 0 ){
            return res.status(200).json({valid: false})
        }else{
            return res.status(200).json({valid: true})

        }
    }

}
export default new trailController()
