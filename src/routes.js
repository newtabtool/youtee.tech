import { Router } from "express";
const routes = new Router()
import videoController from "./app/controllers/videoController.js";
import SessionsController from "./app/controllers/sessionController.js";
import userController from "./app/controllers/userController.js";
import trailController from './app/controllers/trailController.js'; 
import comunityController from "./app/controllers/comunityController.js";

//--------------------------rota principal -------------------------------
routes.get('/', (req, res, next) => SessionsController(req, res, next), userController.mainController)
routes.get('/welcome', (req, res) => { res.render('welcome') })
routes.get('/news', (req, res) => { res.render('news') })

// ---------------------------- video ---------------------------
routes.get('/new', (req, res, next) => SessionsController(req, res, next), videoController.create)
routes.get('/panel/:id', (req, res, next) => SessionsController(req, res, next), videoController.panel)
routes.get('/video/:id', (req, res, next) => SessionsController(req, res, next), videoController.getVideoDataUnit)
//routes.get('/getframe', (req, res, next) => SessionsController(req, res, next), videoController.getFrame)
routes.get('/video/delete/:id', (req, res, next) => SessionsController(req, res, next), videoController.deleteVideo)



// ----------------------------rota das trilhas --------------------------------
routes.get('/trails', (req, res, next) => SessionsController(req, res, next), videoController.chooseTrail)
routes.post('/trails/create', (req, res, next) => SessionsController(req, res, next), trailController.create)
routes.get('/trail/:id', (req, res, next) => SessionsController(req, res, next), videoController.getVideoData)
routes.post('/trails/testname', (req, res, next) => SessionsController(req, res, next), trailController.testTrailName)
routes.get('/trail/toggle-visibility/:id', (req, res, next) => SessionsController(req, res, next), trailController.changeV)


// ----------------------------rotas da toobar --------------------------------
routes.post('/note/save', (req, res, next) => SessionsController(req, res, next), trailController.saveNote)


//---------------------comunidade----------------------------
routes.get('/comunidade/trails', (req, res, next) => SessionsController(req, res, next), comunityController.listAll)



// ---------------------------- user ------------------------
//routes.post('/user/new', userController.create)
routes.get('/auth/login', userController.getLogin)
routes.post('/auth/login', userController.login)
routes.get('/auth/signup', userController.getSignup)
routes.post('/auth/signup', userController.signup)
routes.get('/auth/logout', userController.getLogout)
routes.get('/auth/delete', userController.delete)




export default routes;