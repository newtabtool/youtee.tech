import videoController from "./app/controllers/videoController.js";
import { io } from "./http.js";
import jwt from 'jsonwebtoken'
import notificationController from "./app/controllers/notificationController.js";
import youtube from 'youtube-metadata-from-url';
import PublicTrailModel from "./app/models/PublicTrailModel.js";


import cookie from 'cookie';

io.on("connection", socket => {
    //console.log("a user connected");

    

    socket.on('get-videos-from-public-trails', async (data) => {
        const videos = await PublicTrailModel.findOne({ _id: data.id });
        const videoCollection = videos.videos;
        const promises = videoCollection.map(video => youtube.metadata(video));
        const videoDataCollection = await Promise.all(promises);
        videoDataCollection.forEach(videoData => {
          socket.emit('stream', videoData);
        });
      });
      








    socket.on('get-notifications', async (data) => {
        //console.log(data);
        const validToken = jwt.verify(data.token, process.env.JWT_SECRET)
        if(validToken){
            const idUser = validToken.id;
            //console.log(idUser)
            const news = await notificationController.getAll(idUser)
            socket.emit('news', {  news: news })
        }
    })
    socket.on("read", async (id) =>{
        //console.log(id)
        const change = await notificationController.read(id)
    })

    socket.on("new-video", async (data) => {

        //console.log(data.cookie);
        const userLoged = jwt.verify(data.cookie, process.env.JWT_SECRET)
        const userId = userLoged.id;
        const url = data.url;
        const trailId = data.trailId
        //console.log(url+'\n'+ trailId+'\n'+  userId)
        try{
            const newVideo = await videoController.create(url, trailId, userId)
            const title = newVideo.title;
            const id = newVideo._id;
            //console.log("titulo:  " +title, id);
            socket.emit("new-video-added", { title: title, _id: id, url: url });
        }catch(err){
            console.log(err)
        }
    })
})