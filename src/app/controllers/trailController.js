import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import TrailModel from '../models/TrailModel.js';
import VideoModel from '../models/VideoModel.js';
import PublicTrailModel from '../models/PublicTrailModel.js';
import youtube from 'youtube-metadata-from-url';


const router = express.Router();

class TrailController {
  async create(req, res) {
    const userId = req.id;
    const { name, type, description } = req.body;
    const tags = [];
    const likes = 0;
    const publik = type === 'public';

    const verifyName = await TrailModel.find({ name: name, creator: userId });
    if (verifyName.length > 0) {
      return res.status(400).send('Você ja cadastrou uma trilha com este nome');
    }

    try {
      const saved = await TrailModel.create({
        creator: userId,
        publik,
        name,
        description,
        likes,
        tags,
      });
      res.status(200).redirect(`/trail/${saved._id}`);
    } catch (error) {
      console.log(error);
    }
  }

  async getTrail(req, res) {
    const { id } = req.params;
    const trail = await TrailModel.findById(id);
    res.status(200).json({ trail });
  }

  async testTrailName(req, res) {
    const { name } = req.body;
    const trail = await TrailModel.find({ name, creator: req.id });

    return res.status(200).json({ valid: trail.length === 0 });
  }

  async saveNote(req, res) {
    const { id: videoId, note } = req.body;

    try {
      await VideoModel.findByIdAndUpdate({ _id: videoId }, { notes: note });
      res.status(200).send({ msg: 'success' });
    } catch (error) {
      console.log(error);
      res.status(400).send({ msg: 'error' });
    }
  }

  async createPublicTrail(req,res){
    //console.log(req.body)
    const { name, description, tags, videos, category, id, sponsored} = req.body;
    if(!id){
      return res.status(400).send({ Mensagem: "Erro, tente novamente"})
    }
    const verifyIsPublic = await TrailModel.findOne({ _id: id})
    if(verifyIsPublic.publik === true){
      return res.status(400).send({ Mensagem: "Erro, tente novamente"})
    }
    const create = await PublicTrailModel.create({ creator: req.id, name, description, tags, category, likes: 0, copys: 0, videos, sponsored})
    //insrir a id da nova trilha criada na trilha antiga
    const insertId = await TrailModel.findOneAndUpdate({ _id: id}, { publik: true, id_public: create._id})
    if(create){
      return res.json({ status: true, id: create._id });
    }
    else{
      return res.json({ status: false, })
    }
  }



  async getPublicTrailPage(req,res){
    const id = req.params.id
    console.log(id)
    const trailData = await PublicTrailModel.findOne({ _id: id })
    console.log(trailData)
    if(trailData){
      res.render('publicTrailPage', { id: id, trailData: trailData});
    }
  }


  


}
export default new TrailController()