import express from 'express';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import TrailModel from '../models/TrailModel.js';
import VideoModel from '../models/VideoModel.js';

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

  async changeV(req, res) {
    const { id: trailId } = req.params;
    const verifyTrailAuthor = await TrailModel.findOne({ _id: trailId });

    if (verifyTrailAuthor && verifyTrailAuthor.creator === req.id) {
      const visibility = !verifyTrailAuthor.publik;

      try {
        await TrailModel.findOneAndUpdate({ _id: trailId }, { publik: visibility });
        res.status(200).json({ visibility });
      } catch (err) {
        console.log(err);
        res.status(400).send(err);
      }
    } else {
      res.status(400).send({ msg: 'Bad Request' });
    }
  }
}
export default new TrailController()