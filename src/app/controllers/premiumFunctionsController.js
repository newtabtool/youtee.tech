import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import youtube from "youtube-metadata-from-url";
import VideoModel from "../models/VideoModel.js";
import TrailModel from "../models/TrailModel.js";
import "youtube-frames";
import axios from "axios";
import sendErrorNotification from "./sendErrorNotification.js";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class PremiumFunctionsController {
  async analysis(req, res) {
    //console.log("Iniciado");
    const title = req.body.title;
    const text_prepare = `Estas são as anotações de um estudante que está estudando com um video que tem o nome ${title}, verfique se há algum erro nelas e, se não houver, responda com dicas e coisas que podem ajuda-lo. Importante, responda como se estivesse falando com ele, na segunda pessoa do singular e use no maximo 90 palavras`;
    const text = req.body.text_to_analyze;
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: text_prepare + text,
      max_tokens: 300,
      temperature: 1,
    });
    const result_draw = await response.data.choices[0];
    const result = result_draw.text.split("\n"); // divide a string em um array com base em \n
    //console.log(result);
    res.json({ result });
  }

  async getGenerateForm(req, res) {
    res.render("generate-trail-form");
  }

  async generateTrail(req, res) {
    //console.log("Gerador de trilhas");
    const theme = req.body.theme;
    if (theme) {
      try {
        const prompt = `Por favor, crie uma lista de tópicos para alguém que quer aprender ${theme}. Para cada item da lista, inclua apenas o nome do tópico e separe por ! . O objetivo é a lista ser bem detalhada. Por exemplo, se o assunto é matemática básica, a lista pode ser assim:
      Adição!Subtração!Multiplicação!Divisão
      Observação: Não envie nada além da lista`;
        const response = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: prompt,
          max_tokens: process.env.max_tokens,
          temperature: 1,
        });
        const result_draw = await response.data.choices[0];
        const result_array = result_draw.text.split("!");
  
        const userId = req.id;
        const { name, type, description } = {
          name: theme,
          type: false,
          description: "",
        };
  
        const tags = [];
        const likes = 0;
        const publik = type;
        let saved
  
        try {
           saved = await TrailModel.create({
            creator: userId,
            publik,
            name,
            description,
            likes,
            tags,
          });
        } catch (error) {
          sendErrorNotification(error.toString()+"\n \n \n premiumFunctionsController linha 121");
          res.status(500).json({ error: "Erro ao salvar a trilha" });
        }

          for (const result of result_array) {
  
            const urlReq = `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&type=video&part=snippet&q=${theme + " " + result}`;
            const get_videos = await axios.get(urlReq);
            const video = get_videos.data.items[0];
            let videoId = video.id.videoId;
            const title = video.snippet.title;
  
            let arrayTitles;
            let relateds = [];
            let newVideo;
            //console.log(title);
            try {
              const urlReq = `https://www.googleapis.com/youtube/v3/search?key=${process.env.GOOGLE_API_KEY}&type=video&part=snippet&q=${title}`;
              const equals = await axios.get(urlReq);
              let thumbnail = equals.data.items[0].snippet.thumbnails.high.url;
              arrayTitles = equals.data.items;
              arrayTitles.forEach((element) => {
                let t = element.snippet.title;
                let s = element.snippet.channelTitle;
                let id = equals.data.items[0].id.videoId;
                let u = `https://www.youtube.com/watch?v=${element.id.videoId}`;
                relateds.push({ title: t, url: u, channel: s });
              });
              
              newVideo = await VideoModel.create({
                userId: userId,
                trailId: saved._id,
                url: `https://www.youtube.com/watch?v=${videoId}`,
                title: title,
                thumbnail: thumbnail,
                transcription: "Baixando",
                notes: "Digite aqui suas notas sobre o vídeo",
                related: relateds,
              });
            } catch (error) {
                sendErrorNotification(error.toString()+"\n \n \n premiumFunctionsController linha 114");
            }
            //console.log('\n \n \n' + newVideo);
          }
          res.status(200).json({ trail_id: saved._id });
      } catch (error) {
        sendErrorNotification(error.toString()+"\n \n \n premiumFunctionsController linha 125");
        res.status(500).json({ error: "Erro ao gerar a trilha" });
      }
    } else {
      res.status(400).json({ error: "Tema não informado" });
    }
  }
}
export default new PremiumFunctionsController();
