import { Router } from "express";
const routes = new Router()
import videoController from "./app/controllers/videoController.js";
import SessionsController from "./app/controllers/sessionController.js";
import userController from "./app/controllers/userController.js";
import trailController from './app/controllers/trailController.js'; 

//--------------------------rota principal -------------------------------
routes.get('/', (req, res, next) => SessionsController(req, res, next), userController.mainController)


// ---------------------------- video ---------------------------
routes.get('/new', (req, res, next) => SessionsController(req, res, next), videoController.create)
routes.get('/panel/:id', (req, res, next) => SessionsController(req, res, next), videoController.panel)



// ----------------------------rota das trilhas --------------------------------
routes.get('/trails', (req, res, next) => SessionsController(req, res, next), videoController.chooseTrail)
routes.post('/trails/create', (req, res, next) => SessionsController(req, res, next), trailController.create)
routes.post('/trails/testname', (req, res, next) => SessionsController(req, res, next), trailController.testTrailName)



// ---------------------------- user ------------------------
//routes.post('/user/new', userController.create)
routes.get('/auth/login', userController.getLogin)
routes.post('/auth/login', userController.login)
routes.get('/auth/signup', userController.getSignup)
routes.post('/auth/signup', userController.signup)
routes.get('/auth/logout', userController.getLogout)
routes.get('/auth/delete', userController.delete)




export default routes;