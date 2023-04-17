import express from 'express';
import checkLogin from '../my_modules/checkLogin.js';
import checkSignup from '../my_modules/checkSignup.js';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

import dotenv from "dotenv";
dotenv.config()
const router = express.Router();
express().use(express.json())

class UserController {
  async mainController(req, res) {
    const user = req.id;
    res.render('chooseTrail', { user });
  }

  async getLogin(req, res) {
    res.status(200).render('login');
  }

  async getSignup(req, res) {
    res.render('signup');
  }

  async login(req, res) {
    function salvarTokenNoCookie(res, token) {
      const tempoExpiracao = 60 * 60 * 24 * 7; // 1 semana
      res.cookie('jwt_token', token, { maxAge: tempoExpiracao * 1000, httpOnly: false });
    }

    const email = req.body.email;
    const password = req.body.password;
    const loging = checkLogin(email, password);
    if (loging) {
      try {
        const user = await User.findOne({ email });
        const token_secret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id, email: email, premium: user.premium }, token_secret, { expiresIn: '7d' });
        await salvarTokenNoCookie(res, token);
        res.redirect('/');
      } catch (err) {
        console.log(err);
        res.status(501).send('Erro ao realizar login');
      }
    } else {
      res.status(501).send('Erro ao realizar login, dados errados');
    }
  }

  async signup(req, res) {
    const email = req.body.email;
    const password = req.body.password;
    const password_confirm = req.body.password_confirm;
    const signuping = await checkSignup(email, password);
    const token_secret = process.env.JWT_SECRET;
    if (signuping != false) {
      let salt = bcrypt.genSaltSync(14);
      let password_hash = bcrypt.hashSync(password, salt);
      try{
      const signup = await User.create({ email, password: password_hash, premium: false });
      if (signup) {
        const token = jwt.sign({ id: signup._id, email: email, premium: signup.premium }, token_secret, { expiresIn: '30d' });
        //res.header('authorization-token', token).json({ msg: 'logado' });
        const tempoExpiracao = 60 * 60 * 24 * 7; // 1 semana
        res.cookie('jwt_token', token, { maxAge: tempoExpiracao * 1000, httpOnly: false });
        res.redirect('/');
      } 
    }catch(err){
      res.status(501).send('Erro ao realizar cadastro');
    }
    } else {
      res.status(501).send('Erro ao realizar cadastro, verifique os dados. Se voce ja se cadastrou anteriormente tente fazer login');
    }
  }

  async getLogout(req, res) {
    console.log('logout');
    res.status(200).send('logout');
  }

  async delete(req, res) {
    console.log('delete');
    res.status(200).send('delete');
  }
  async syncFinish(req,res){
    const token_secret = process.env.JWT_SECRET
    const ticket = await jwt.decode(req.body.token);
    let token = JSON.stringify(req.body.token)
    const id = ticket.sub
    const email = ticket.email
    const user = await User.findOneAndUpdate({email}, {id_google: id}).then((user)=>{
      return res.json({ status: true})
    }).catch((err)=>{
      return res.json({ status: false})
    })



  }
  async signupGoogle(req,res){
    const token_secret = process.env.JWT_SECRET
    const ticket = await jwt.decode(req.body.token);
    const email = ticket.email
    const verify = await User.findOne({email})
    if(verify){
      return res.json({status: 0})
    }
    const user  = await User.create({ email, password: "", premium: false, id_google: ticket.sub }).then((user)=>{
        const token = jwt.sign({ id: user._id, email: user.email, premium: user.premium }, token_secret, { expiresIn: '30d' });
      return res.json({status: 1, token: token})
    }).catch((err)=>{
      console.log(err)
      return res.json({status: 2})
    })
  }
  async google(req,res){

    try {

      // verifica a assinatura do token usando a chave pública do Google
      const ticket = await jwt.decode(req.body.token);
  
      // retorna o ID do usuário do token
      const email = ticket.email
      const id = ticket.sub
      //console.log(id)
      const user = await User.findOne({email})
      //console.log(user)
      if(user.id_google == id){
        const token_secret = process.env.JWT_SECRET
        const token = jwt.sign({ id: user._id, email: email, premium: user.premium, id_google: id }, token_secret, { expiresIn: '30d' });
        //console.log(token)
        return res.json({token: token, status: "log"})
      }

      if(!user){
        return res.json({status: "unknown"})
      }
      if(user && user.id_google==="" || !user.id_google){
        return res.json({status: "go_auth"})
      }
        return res.json({MSG:"Não encontrado"})

      

    } catch (err) {
      console.error(err);
      return null;
    }
  }
  async setCookie(req,res){
    const token = req.params.token;
    const tempoExpiracao = 60 * 60 * 24 * 7; // 1 semana
    res.cookie('jwt_token', token, { maxAge: tempoExpiracao * 1000, httpOnly: false });
    res.redirect("/")

  }

  
  async googleSync(req, res){
    
    function salvarTokenNoCookie(res, token) {
      const tempoExpiracao = 60 * 60 * 24 * 7; // 1 semana
      res.cookie('jwt_token', token, { maxAge: tempoExpiracao * 1000, httpOnly: false });
    }

    const email = req.body.email;
    const password = req.body.password;
    if(!email || !password){
      return res.redirect('/auth/login')
    }
    const loging = checkLogin(email, password);

    if (loging) {
      try {
        const user = await User.findOne({ email });
        const token_secret = process.env.JWT_SECRET;
        const token = jwt.sign({ id: user._id, email: email, premium: user.premium }, token_secret, { expiresIn: '7d' });
        await salvarTokenNoCookie(res, token);
        res.render('googleSync')
      } catch (err) {
        console.log(err);
        res.status(501).send('Erro ao realizar login');
      }
    } else {
      res.status(501).send('Erro ao realizar login, dados errados');
    }

  }


  async logout(req,res){
    res.clearCookie('jwt_token');
    res.redirect('/welcome')
  }
}

export default new UserController();
