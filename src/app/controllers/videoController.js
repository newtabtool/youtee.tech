import { getSubtitles } from 'youtube-captions-scraper';
import youtube from 'youtube-metadata-from-url';
import axios from 'axios';
import VideoModel from '../models/VideoModel.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import UserModel from '../models/UserModel.js';
import TrailModel from '../models/TrailModel.js';
import 'youtube-frames';




let videoId;
let title;
let text;
let url;


class videoController {
    //escolher trilha de estudos ---------------------------------------------
    async chooseTrail(req, res) {
        let user = req.id;
        let trails = await TrailModel.find({ creator: user })
        ///console.log(trails)
        return res.send({ trails: trails })
    }



    //listar videos -------------------------------------------------------------------
    async list(req, res) {
        console.log("aqui")

        try {
            let userId = req.user.id
            const videos = await VideoModel.find({ user: userId }).select('_id title url thumbnail ')
            res.status(200).render('index')
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Erro inesperado" })
        }
    }

    async getVideoDataUnit(req, res) {
        console.log("get video data")
        try {
            let videoId = req.params.id
            //console.log(videoId)
            const videoData = await VideoModel.find({ _id: videoId })
            res.status(200).json({ videoData })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ error: "Erro inesperado" })
        }
    }

    async getVideoData(req, res) {
        const id = req.params.id
        const trail = await TrailModel.findById(id)
        console.log(trail)
        const videos = await VideoModel.find({ trailId: id })
        res.status(200).render('workflow', { trail: trail, videos: videos })
    }




    //panel
    async panel(req, res) {

        let userId = req.body.user || 'teste'
        let id = req.params.id
        const video = await VideoModel.findOne({ _id: id, userId: userId })
        return res.json(video)
    }





    //inserir video
    async create(url, trailId, userId) {

        function getId(url) {
            var regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^\&\?]*).*/;
            var match = url.match(regex);
            var videoID = match[7];
            return videoID;
        }
        try {
            let videoId = getId(url);
            title = await youtube.metadata(url).then(function (json) {
              return json.title;
            }, function (err) {
              console.log(err);
            });
          
            text = await getSubtitles({
              videoID: videoId,
              lang: 'pt'
            }).then(captions => {
              let textComplete = '';
              captions.forEach(element => {
                textComplete = textComplete + " " + element.text + " ";
              });
              return textComplete;
            }).catch(async err => {
              console.log('Erro ao obter legendas em português:', err);
              try {
                const captions = await getSubtitles({
                  videoID: videoId,
                  lang: 'en'
                });
                let textComplete = '';
                captions.forEach(element => {
                  textComplete = textComplete + " " + element.text + " ";
                });
                return textComplete;
              } catch (err) {
                console.log('Erro ao obter legendas em inglês:', err);
              }
            });
          } catch (err) {
            console.log(err);
          }

        //console.log(title)
        //console.log(text)
        let arrayTitles;
        let relateds = [];
        let newVideo;
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
                relateds.push({ title: t, url: u, channel: s })

            })
            //console.log(relateds)
            if(text === undefined){
                text = "erro ao baixar transcrição"
            }
            newVideo = await VideoModel.create({
                userId: userId,
                trailId: trailId,
                url: url,
                title: title,
                thumbnail: thumbnail,
                transcription: text,
                notes: 'Digite aqui suas notas sobre o vídeo',
                related: relateds
            })

        } catch (error) {
            console.log(error)
        }
        //console.log('\n \n \n' + newVideo)
        return newVideo;
        //res.json({title: title, descriptionn: text, relact: arrayTitles})
    }






    //editar iformações do video
    async edit(req, res) {
        VideoModel.findByIdAndUpdate({ id: req.params.id }, { notes: req.query.notes })
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
    async deleteVideo(req, res) {

        try {
            const video = await VideoModel.findOne({ _id: req.params.id })
            //console.log("video " + video)
            if (video){
                const userIdDb = video.userId
                //console.log("User id deb: -------------------------------------" + userIdDb)
                if (userIdDb === req.id) {
                    let deleteVideoDb = await VideoModel.findByIdAndDelete({ _id: req.params.id })
                    //console.log(deleteVideoDb)
                    res.status(200).send({ stats: "ok" })
                    return
                }
            }
            res.status(400).send('erro inesperado')
          } catch (error) {
            console.log(error)
            res.status(400).send('erro inesperado')
          }
          
    }


    async getFrame(req, res) {
        const videoUrl = req.body.url
        const o = $ytvideo('https://www.youtube.com/watch?v=sDj72zqZakE', 'waffle_falling');
        await o.download().toFrames(1, "00:00:01", "00:00:02");
    }





}

export default new videoController();