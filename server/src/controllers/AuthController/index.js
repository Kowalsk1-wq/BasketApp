const axios = require('axios');
const bcrypt = require('bcryptjs');
const jwebtoken = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const User = require('../../models/User.js');
const emailService = require('../../services/email');

module.exports = {
  list : async (request, response) => {
    const token = request.headers['x-access-token'];
    let users = await User.findAll();

    let decodedToken = await jwtDecode(token);

    let me = [];
    let friends = [];

    users.map((el) => {
      if (el.id === decodedToken.id) {
        me.push(el);
      } else {
        friends.push(el);
      }
    });

    return response.json({
      auth: true,
      me: me[0],
      users: friends
    })
  },

  create : async (request, response) => {
    const { data } = request.file;
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      gender,
      city,
      uf
    } = request.body;

    let user = await User.findOne({ email })

    if (user) {
      return response.status(401).json({
        error: 'User Already Exists!'
      });
    } else {
      const hashPwd = await bcrypt.hash(password, 12);

      await User.create({
        active: false,
        picture: data.link,
        deleteHash: data.deletehash,
        firstName,
        lastName,
        email,
        password: hashPwd,
        phone,
        gender,
        city,
        uf,
      });

      emailService.send(
        email,
        'Bem-Vindo ao BasketApp', 
        `
        <h1 style='margin-left:10%'>Bem-Vindo <strong>${firstName} ${lastName}</strong></h1>
        <p>
          Você acaba de realizar o cadastro no BasketApp, sua plataforma comunitária de doação de cestas básicas <br/>
          Para ter acesso à nossa plataforma, siga estes passos: <br/>
            >> 1) Digite suas credenciais: <br/>
              <strong>Email:</strong> ${email} <br/>
              <strong>Senha:</strong> a senha que você cadastrou! <br/>
            >> 2) Se Você conseguiu entrar na plataforma, muito bem, divirta-se! <br/>Agora, se não conseguiu,<br/> envie um email para nós agora mesmo: limabrot879@gmail.com e <strong>nos informe o seu problema</strong>
        </p>
        `
      );

      return response.json({
        success: true,
        email,
        message: 'User Sucessful Registered!'
      })
    }
  },

  update : async (request, response) => {
    const token = request.headers['x-access-token'];
    const { email } = jwtDecode(token);
    const data = request.body;
    const creds = Object.keys(data);

    let user = await User.findOne({ email });

    let errors = [];

    creds.map(async (el, index) => {
      if (el !== creds[index]) {
        errors.push(el);
      } else {
        user[el] = data[el];
        await user.save();
      }
    })

    return response.json({
      updated: true,
      message: '0 Errors Found!'
    });
  },

  delete : async (request, response) => {
    const token = request.headers['x-access-token'];
    const decodedToken = jwtDecode(token);

    const user =  await User.findOne({ 'email': decodedToken.email });

    await axios({
      method: 'delete',
      url: `https://api.imgur.com/3/image/${user.deleteHash}`,
      headers: {
        'Authorization': `Client-Id ${process.env.IMGUR_CLIENT_ID}`
      }
    })

    await user.remove();

    return response.status(200).send();
  },

  /* Authentication */

  login : async (request, response) => {
    const { email, password } = request.body;

    let user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({
        auth: false,
        message: 'Could Not Find The User'
      });
    }

    if (user.active === "false") {
      return response.status(401).json({
        auth: false,
        message: 'Confirm The User Email!'
      })
    }

    const isMatched = await bcrypt.compare(password, user.password);

    if (!isMatched) {
      return response.status(404).json({
        auth: false,
        message: 'Bad Password!'
      });
    }

    var token = jwebtoken.sign({ email }, 'aklzaoililajh', {
      expiresIn: 1800
    });

    return response.status(200).json({ 
      auth: true,
      user,
      token
    });
  },

  active : async (request, response) => {
    const email = request.headers['x-access-email'];

    let user = await User.findOne({ email });

    if (!user) {
      return response.status(404).json({
        activated: false,
        message: 'User Not Found!'
      })
    } else {
      if (user.active === "true") {
        return response.json({
          activated: true,
          message: 'User Already Activated!'
        })
      } else {
        user.active = true;
        await user.save();

        return response.json({
          activated: true,
          message: 'User Successful Activated!'
        })
      }
    }
  }
}
