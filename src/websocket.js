import videoController from "./app/controllers/videoController.js";
import { io } from "./http.js";
import jwt from 'jsonwebtoken'


import cookie from 'cookie';

io.on("connection", socket => {
    //console.log("a user connected");

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