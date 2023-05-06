import TrailModel from "../models/TrailModel.js";
import youtube from "youtube-metadata-from-url";
import axios from "axios";
import VideoModel from "../models/VideoModel.js";

class extensionController {
  async getAll(req, res) {
    try {
      let trails = await TrailModel.find({ creator: req.id });
      //console.log(trails);
      return res.json({ trails });
    } catch (error) {
      sendErrorNotification(error.toString()+"\n \n \n extensionController linha 13");
    }
  }

  async getToken(req, res) {
    const token = req.cookies.jwt_token;
    return res.json({ token });
  }

  async postVideo(req, res) {
    let title;
    const trailId = req.params.trailId;
    const url = req.body.url;
    console.log(url);
    console.log(trailId);
    const userId = req.id;

    function getId(url) {
      var regex =
        /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^\&\?]*).*/;
      var match = url.match(regex);
      var videoID = match[7];
      return videoID;
    }

    try {
      let videoId = getId(url);
      title = await youtube.metadata(url).then(
        function (json) {
          return json.title;
        },
        function (err) {
          console.log(err);
        }
      );
    } catch (error) {
      sendErrorNotification(error.toString()+"\n \n \n extensionController linha 49");
    }

    let arrayTitles;
    let relateds = [];
    let newVideo;
    try {
      const urlReq = `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&type=video&part=snippet&q=${title}`;
      const equals = await axios.get(urlReq);
      let thumbnail = equals.data.items[0].snippet.thumbnails.high.url;
      arrayTitles = equals.data.items;
      arrayTitles.forEach((element) => {
        let t = element.snippet.title;
        let s = element.snippet.channelTitle;
        let id = equals.data.items[0].id.videoID;
        let u = `https://www.youtube.com/watch?v=${element.id.videoId}`;
        relateds.push({ title: t, url: u, channel: s });
      });
      try {
        newVideo = await VideoModel.create({
          userId: userId,
          trailId: trailId,
          url: url,
          title: title,
          thumbnail: thumbnail,
          transcription: "Baixando",
          notes: "Digite aqui suas notas sobre o vídeo",
          related: relateds,
        });
        res.status(200).send("ok");
      } catch (error) {
      sendErrorNotification(error.toString()+"\n \n \n extensionController linha 80");
      }
    } catch (error) {
      sendErrorNotification(error.toString()+"\n \n \n extensionController linha 83");
    }
    return newVideo;
  }
}
export default new extensionController();
