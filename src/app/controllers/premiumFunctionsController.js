import { Configuration, OpenAIApi } from "openai";
import dotenv from "dotenv";
import youtube from "youtube-metadata-from-url";
import VideoModel from "../models/VideoModel.js";
import TrailModel from "../models/TrailModel.js";
import "youtube-frames";
import axios from "axios";
import sendErrorNotification from "./sendErrorNotification.js";
//import puppeteer from "puppeteer";

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
    const theme = req.body.theme
    const url = process.env.API_URL;
    const token = process.env.token_;

    axios
      .post(url, { token, theme }, { timeout: 780000 })
      .then(async (response) => {
        const data_for_looping = response.data.resp;
        //depois de receber a resposta cria uma trilha
        console.log("Dados recebidos: \n"+data_for_looping)
        if(data_for_looping.length == 0){
          return res.status(500).json({ erro: "Não foi possível encontrar nenhum vídeo com esse tema"})
        }
        for(const video of data_for_looping){
          console.log("Titulo do video: \n"+video.title)
          console.log("URL do video: \n"+video.url)
          console.log("Thumbnail do video: \n"+video.thumbnail)
          console.log("Relateds do video: \n"+video.relateds)
        }
        let userId = req.id
        let name = theme
        let description = theme
        let likes = 0
        let tags = ""
        let saved;
        let publik = false;
        try {
          saved = await TrailModel.create({
           creator: userId,
           publik,
           name,
           description,
           likes,
           tags,
         })
       } catch (error) {
         sendErrorNotification(error.toString()+"\n \n \n premiumFunctionsController linha 69");
         res.status(500).json({ error: "Erro ao salvar a trilha" });
       }
       for (const data of data_for_looping) {
        let newVideo;
        try {
          newVideo = await VideoModel.create({
            userId: userId,
            trailId: saved._id,
            url: data.url,
            title: data.title,
            thumbnail: data.thumbnail,
            transcription: "Baixando",
            notes: "Digite aqui suas notas sobre o vídeo",
            related: data.relateds,
          });
        } catch (error) {
          console.log(error);
        }
      }
      
        res.status(200).json({ trail_id: saved._id });

      })
      .catch((error) => {
        console.error("Erro:", error);
      });
  }
}
export default new PremiumFunctionsController();
