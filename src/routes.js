import { Router } from "express";
const routes = new Router()
import videoController from "./app/controllers/videoController.js";
import SessionsController from "./app/controllers/sessionController.js";
import userController from "./app/controllers/userController.js";
import trailController from './app/controllers/trailController.js'; 
import comunityController from "./app/controllers/comunityController.js";
import publicTrailController from "./app/controllers/publicTrailController.js";
import PaymentController from "./app/controllers/paymentController.js";

//--------------------------rota principal -------------------------------
routes.get('/', (req, res, next) => SessionsController(req, res, next), userController.mainController)
routes.get('/welcome', (req, res) => { res.render('welcome') })
routes.get('/news', (req, res) => { res.render('news') })
routes.get('/prices', (req, res) => { res.render('checkout/prices') })


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
routes.post('/rating/:id', (req, res, next) => SessionsController(req, res, next), publicTrailController.ratingTrail)
routes.post('/trails/testname', (req, res, next) => SessionsController(req, res, next), trailController.testTrailName)
routes.post('/create-public-trail', (req, res, next) => SessionsController(req, res, next), trailController.createPublicTrail)
routes.get('/public-trails/:id', (req,res) => trailController.getPublicTrailPage(req,res))
routes.get('/public-collections/', (req,res) => publicTrailController.getAll(req,res))
routes.get('/sort-by-category/:category', (req,res) => publicTrailController.getForCategory(req,res))
routes.get('/copy/:id', (req, res, next) => SessionsController(req, res, next), publicTrailController.copy)
routes.get('/delete-trail/:id', (req, res, next) => SessionsController(req, res, next), trailController.delete)



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
routes.post('/auth/signup/google', userController.signupGoogle)
routes.get('/logout', userController.logout)
routes.get('/auth/login/set_cookie/:token', (req,res) => userController.setCookie(req,res))
routes.get('/auth/delete', userController.delete)
routes.post('/sync/google', (req,res) => userController.syncFinish(req,res))
routes.post('/auth/google', (req,res) => userController.google(req,res))
routes.post('/auth/google/sync', (req,res) => userController.googleSync(req,res))
routes.get('/contact', (req,res) => res.render('contact'))
routes.get('/404', (req,res) => res.render('404'))


//----------------------------checkout-----------------------
routes.get("/checkout", (req,res, next)=> SessionsController(req, res, next), PaymentController.checkout)
routes.get("/initiate-checkout", (req,res, next)=> SessionsController(req, res, next), PaymentController.payment)
routes.get("/payment/success/:id", (req,res, next)=> SessionsController(req, res, next), PaymentController.success)
routes.get("/payment/cancel/:id", (req,res, next)=> SessionsController(req, res, next), PaymentController.cancel)

export default routes;