import PublicTrailModel from '../models/PublicTrailModel.js';
import TrailModel from '../models/TrailModel.js';
import User from '../models/UserModel.js';
import videoController from './videoController.js';
import youtube from 'youtube-metadata-from-url';


class PublicTrail {
    async getAll(req, res) {
        const trails = await PublicTrailModel.find()
        const entretenimento = await PublicTrailModel.count({ category: 'entretenimento' });
        const musica = await PublicTrailModel.count({ category: 'musica' });
        const esportes = await PublicTrailModel.count({ category: 'esportes' });
        const jogos = await PublicTrailModel.count({ category: 'jogos' });
        const educacao = await PublicTrailModel.count({ category: 'educacao' });
        const comedia = await PublicTrailModel.count({ category: 'comedia' });
        const noticias = await PublicTrailModel.count({ category: 'noticias' });
        const ciencia = await PublicTrailModel.count({ category: 'ciencia' });
        const moda = await PublicTrailModel.count({ category: 'moda' });
        const viagens = await PublicTrailModel.count({ category: 'viagens' });
        const outros = await PublicTrailModel.count({ category: 'outros' });
        const count = {
            entretenimento, musica, esportes, jogos, educacao, comedia, noticias, ciencia, moda, viagens, outros
        }

        //exibir todas as quantidades no console

        res.render('publicTrailsCollection', { trails, count })
    }
    async getForCategory(req, res) { 
        const category = req.params.category
        let arrayTrails = await PublicTrailModel.find({ category: category})
        return res.json({arrayTrails})

    }
    async getForTag() { }
    async copy(req, res) {
        async function verifyCopy(currentTrailId, userId) {
            const verify = await TrailModel.findOne({ copy_of: currentTrailId, creator: userId });
            if (verify) {
                return false
            } else {
                console.log("passou")
                return true

            }
        }

        const id = req.params.id
        const creator = req.id
        const publik = false
        const id_public = ""
        const verify = await verifyCopy(id, creator)
        if (verify) {
            try {
                const currentTrail = await PublicTrailModel.findOne({ _id: id })
                const videosOfCurrentTrail = currentTrail.videos
                const name = currentTrail.name
                const copy_of = currentTrail._id
                const pasteTrail = await TrailModel.create({ creator, publik, id_public, name, copy_of })
                videosOfCurrentTrail.forEach(async video => {
                    function getId(video) {
                        var regex = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^\&\?]*).*/;
                        var match = video.match(regex);
                        var videoID = match[7];
                        return videoID;
                    }
                    let videoId = getId(video);
                    let title = await youtube.metadata(video).then(function (json) {
                        return json.title;
                    }, function (err) {
                        console.log(err);
                    });

                    let newVideo = await videoController.createCopy(title, video, pasteTrail._id, req.id)
                })
                return res.redirect(`/`)
            } catch (err) {
                return res.send({ erro: "houve um erro ao tentar copiar a trilha" })
            }
        } else {
            const verify = await TrailModel.findOne({ copy_of: id, creator: req.id })
            return res.redirect(`/trail/${verify._id}`)
        }


    }
    async ratingTrail(req, res) {
        const id = req.params.id
        const rating = req.body.stars
    
        if (rating > 0 && rating <= 5) {
            const currentTrailPrivate = await TrailModel.findOne({_id:id})
            if(currentTrailPrivate.evaluated === true){
                return res.status(400)
            }
            const publicTrailId = currentTrailPrivate.copy_of
            const trail = await PublicTrailModel.findById(publicTrailId)
            //console.log(trail)
            let stars
            if(!trail.stars){
                stars = 0
            }else{
                stars = Number(trail.stars)
            }
            let votes
            if(!trail.votes){
                votes = 0
            }else{
                votes = Number(trail.votes)
            }
            const newStars = stars + Number(rating)
            const newVotes = votes + 1
    
            const update = {
                stars: newStars,
                votes: newVotes
            }
            console.log(trail.stars)
            try {
                const updateAvaliated = await TrailModel.findByIdAndUpdate({ _id:id}, { evaluated: true}, { new: true})
                const updatedTrail = await PublicTrailModel.findByIdAndUpdate({_id:publicTrailId}, update, { new: true })
                const currentRating = (Number(updatedTrail.stars)/updatedTrail.votes).toFixed(1)
                res.status(200).json({ rating:currentRating })
            } catch (error) {
                res.status(400)
            }
        }
    }
    
}
export default new PublicTrail()