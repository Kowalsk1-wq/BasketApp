const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwebtoken = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const connection = require('../../database/connection');
const emailService = require('../../services/email');

async function updateUser(cred, value) {
  await connection('users')
    .select('*')
    .where({ id: decodedToken.id })
    .update(cred, value)
}

module.exports = {
  list : async (request, response) => {
    const token = request.headers['x-access-token'];
    let users = await connection('users').select('*');

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
    const {
      firstName,
      lastName,
      email,
      password,
      phone,
      bio,
      gender,
      city,
      uf,
      fbLink,
      twLink,
      igLink
    } = request.body;

    const user = await connection('users').select('*').where({ email });

    if (user.length !== 0) {
      return response.status(401).json({
        error: 'User Already Exists!'
      });
    } else {
      let id = crypto.randomBytes(5).toString('HEX');
      const hashPwd = await bcrypt.hash(password, 12);

      await connection('users').insert({
        id,
        active: false,
        picture: '',
        firstName,
        lastName,
        email,
        password: hashPwd,
        phone,
        bio,
        gender,
        city,
        uf,
        fbLink,
        twLink,
        igLink,
        coins: 500,
        followers: 0,
        following: 0,
        envpoints: 0,
        achievements: 0
      });

      emailService.send(
        email,
        'Bem-Vindo ao Env.GO', 
        `
        <h1 style='margin-left:10%'>Bem-Vindo <strong>${firstName} ${lastName}</strong></h1>
        <p>
          Você acaba de realizar o cadastro no Env.GO, sua plataforma comunitária de preservação ambiental <br/>
          Para ter acesso à nossa plataforma, siga estes passos: <br/>
            >> 1) Digite suas credenciais: <br/>
              <strong>EnvId:</strong> ${id} <br/>
              <strong>Senha:</strong> a senha que você cadastrou! <br/>
            >> 2) Se Você conseguiu entrar na plataforma, muito bem, divirta-se! <br/>Agora, se não conseguiu,<br/> envie um email para nós agora mesmo: limabrot879@gmail.com e <strong>nos informe o seu problema</strong>
        </p>
        `
      );

      return response.json({
        success: true,
        email,
        id,
        message: 'User Sucessful Registered!'
      })
    }
  },

  update : async (request, response) => {
    const token = request.headers['x-access-token'];
    const decodedToken = jwtDecode(token);
    const data = request.body;
    const creds = Object.keys(data);

    let errors = [];

    creds.map(async (el, index) => {
      if (el !== creds[index]) {
        errors.push(el);
      } else {
        await connection('users')
          .select('*')
          .where({ id: decodedToken.id })
          .update(el, data[el])
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
    await connection('users').select('*').where({ id: decodedToken.id }).delete()

    return response.status(200).send();
  },

  /* Authentication */

  login : async (request, response) => {
    const { id, password } = request.body;

    const user = await connection('users').select('*').where({ id });

    if (user.length === 0) {
      return response.status(404).json({
        auth: false,
        message: 'Could Not Find The User'
      });
    }

    if (user[0].active === 0) {
      return response.status(401).json({
        auth: false,
        message: 'Confirm The User Email!'
      })
    }

    const isMatched = await bcrypt.compare(password, user[0].password);

    if (!isMatched) {
      return response.status(404).json({
        auth: false,
        message: 'Bad Password!'
      });
    }

    var token = jwebtoken.sign({ id }, 'aklzaoililajh', {
      expiresIn: 1800
    });

    return response.status(200).json({ 
      auth: true,
      user,
      token
    });
  },

  active : async (request, response) => {
    const id = request.headers['x-access-id'];

    let user = await connection('users').select('*').where({ id });

    if (user.length === 0) {
      return response.status(404).json({
        activated: false,
        message: 'User Not Found!'
      })
    } else {
      if (user[0].active === 1) {
        return response.json({
          activated: true,
          message: 'User Already Activated!'
        })
      } else {
        user = await connection('users').select('*').where({ id }).update({
          active: true
        })

        return response.json({
          activated: true,
          message: 'User Successful Activated!'
        })
      }
    }
  }
}
