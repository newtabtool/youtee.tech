import db from "./db.js";
import express from "express";
import routes from "./routes.js";
import dotenv from "dotenv";
import cookieParser from 'cookie-parser';
import cors from 'cors'




class App{
    constructor(){
        this.app = express();
        this.middlewares();
        this.routes();
        this.sets();
    }
    middlewares(){
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended:true}));
        dotenv.config();
        this.app.use(cookieParser());
        
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "https://www.youtube.com")
            res.setHeader('Access-Control-Allow-Credentials', 'true');
            next()
        }) 
        this.app.use(cors({ 
            origin: 'https://www.youtube.com', 
            credentials: true 
        }));
        
    }
    sets(){
        this.app.set("view engine", "ejs");
        this.app.set("views", "src/views");
        this.app.use(express.static("public"));
        this.app.use((req,res)=>{
            res.status(404).render('404');
        })
        
    }
    routes(){
        this.app.use(routes);
    }

}

export default new App().app;