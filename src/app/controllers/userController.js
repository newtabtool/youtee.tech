import express from 'express';
import checkLogin from '../my_modules/checkLogin.js';
import checkSignup from '../my_modules/checkSignup.js';
import bcrypt from 'bcryptjs';
import User from '../models/UserModel.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

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
      const signup = await User.create({ email, password: password_hash, premium: false });
      if (signup) {
        const token = jwt.sign({ id: signup._id, email: email, premium: signup.premium }, token_secret, { expiresIn: 30 });
        //res.header('authorization-token', token).json({ msg: 'logado' });
        const tempoExpiracao = 60 * 60 * 24 * 7; // 1 semana
        res.cookie('jwt_token', token, { maxAge: tempoExpiracao * 1000, httpOnly: false });
        res.redirect('/');
      } else {
        res.status(501).send('Erro ao realizar cadastro');
      }
    } else {
      res.status(501).send('Erro ao realizar cadastro');
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
}

export default new UserController();
