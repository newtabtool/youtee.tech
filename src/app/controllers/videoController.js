import { getSubtitles } from 'youtube-captions-scraper';
import youtube from 'youtube-metadata-from-url';
import axios from 'axios';
import VideoModel from '../models/VideoModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import TrailModel from '../models/TrailModel.js';




const videoId = 'vYekSMBCCiM'
let title;
let text;
let url;


class videoController {
    //escolher trilha de estudos ---------------------------------------------
    async chooseTrail(req,res){
        let user = req.id;
        let trails = await TrailModel.find({ creator: user})
        return res.json(trails)
    }



    //listar videos -------------------------------------------------------------------
    async list(req, res) {
        console.log("aqui")
        
        try{
        let userId = req.user.id
        const videos = await VideoModel.find({ user: userId }).select('_id title url thumbnail ')
        res.status(200).render('index')
        }catch(err){
            console.log(err)
            return res.status(500).json({ error: "Erro inesperado" })
        }
    }




    //panel
    async panel(req, res) {

        let userId = req.body.user || 'teste'
        let id = req.params.id
        const video = await VideoModel.findOne({ _id: id, userId: userId })
        return res.json(video)
    }





    //inserir video
    async create(req, res) {

        url = 'https://www.youtube.com/watch?v=MeS6dX2a2zQ&t=979s';
        title = await youtube.metadata(url).then(function (json) {
            //console.log(json);
            return json.title;
        }, function (err) {
            console.log(err);
        });


        text = await getSubtitles({
            videoID: videoId, // youtube video id
            lang: 'pt' // default: `en`
        }).then(captions => {
            // console.log(captions);
            let textComplete = ''
            captions.forEach(element => {
                textComplete = textComplete + " " + element.text + " ";

            });
            //console.log(textI)
            return textComplete
        })
        //console.log(title)
        //console.log(text)
        let arrayTitles;
        let relateds = [];
        try {

            const urlReq = `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&type=video&part=snippet&q=${title}`
            const equals = await axios.get(urlReq)
            let thumbnail = equals.data.items[0].snippet.thumbnails.high.url
            //console.log(equals.data.items[0].snippet.thumbnails)
            arrayTitles = equals.data.items
            arrayTitles.forEach(element => {
                let t = element.snippet.title
                let s = element.snippet.channelTitle
                let id = equals.data.items[0].id.videoID
                let u = `https://www.youtube.com/watch?v=${element.id.videoId}`
                //console.log(u)
                relateds.push({ title: t, url: u, channel: s})
                
            })
            //console.log(relateds)
            VideoModel.create({
                userId: "teste",
                url: url,
                title: title,
                thumbnail: thumbnail,
                transcription: text,
                notes: 'Digite aqui suas notas sobre o vídeo',
                related: relateds
            }).then(response => {
               // console.log(response)
            }).catch(error => {
                console.log(error)
            }) 

        } catch (error) {
            console.log(error)
        }
        res.render('dashCentral', { title: title })
        //res.json({title: title, descriptionn: text, relact: arrayTitles})
    }






    //editar iformações do video
    async edit(req, res) {
        VideoModel.findByIdAndUpdate({ id: req.params.id}, { notes: req.query.notes})
        .then(
            response => {
                res.status(200).send('ok')
            }
        ).catch(error => {
            console.log(error)
            res.status(500).send('erro')
        })
    }






    //deletar video
    async delete(req, res) {
        VideoModel.findByIdAndDelete({ id: req.params.id }).then(response => {
            res.status(200).send('ok')
        })
    }




}

export default new videoController();