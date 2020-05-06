const axios = require('axios');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwebtoken = require('jsonwebtoken');
const jwtDecode = require('jwt-decode');

const connection = require('../../database/connection');
const emailService = require('../../services/email');

async function updateong(cred, value) {
  await connection('ongs')
    .select('*')
    .where({ id: decodedToken.id })
    .update(cred, value)
}

module.exports = {
  create : async (request, response) => {
    const { data } = request.file;
    const {
      name,
      cnpj,
      email,
      password,
      phone,
      city,
      uf
    } = request.body;

    const ong = await connection('ongs').select('*').where({ email });

    if (ong.length !== 0) {
      return response.status(401).json({
        error: 'ong Already Exists!'
      });
    } else {
      let id = crypto.randomBytes(5).toString('HEX');
      const hashPwd = await bcrypt.hash(password, 12);

      await connection('ongs').insert({
        id,
        active: false,
        picture: data.link,
        deleteHash: data.deletehash,
        name,
        cnpj,
        email,
        password: hashPwd,
        phone,
        bio,
        city,
        uf,
      });

      emailService.send(
        email,
        'Bem-Vindo ao BasketApp - ONG Edition', 
        `
        <h1 style='margin-left:10%'>Bem-Vindo <strong>${name}</strong></h1>
        <p>
          Sua ONG poderá agora solicitar doações de cestas básicas, <br/>
          na qual os usuários terão disponibilidade para doar os itens necessários para você! <br />
          Para ter acesso à nossa plataforma, siga estes passos: <br/>
            >> 1) Digite suas credenciais: <br/>
              <strong>CNPJ de Sua Ong:</strong> ${cnpj} <br/>
              <strong>Senha:</strong> a senha que você cadastrou! <br/>
            >> 2) Se Você conseguiu entrar na plataforma, muito bem, divirta-se! <br/>Agora, se não conseguiu,<br/> envie um email para nós agora mesmo: limabrot879@gmail.com e <strong>nos informe o seu problema</strong> <br/>
        </p>
        `
      );

      return response.json({
        success: true,
        email,
        id,
        message: 'ONG Sucessful Registered!'
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
        await connection('ongs')
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

    const [ong] =  await connection('ongs').select('*').where({ id: decodedToken.id })

    await axios({
      method: 'delete',
      url: `https://api.imgur.com/3/image/${ong.deleteHash}`,
      headers: {
        'Authorization': `Client-Id ${process.env.IMGUR_CLIENT_ID}`
      }
    })

    await connection('ongs').select('*').where({ id: decodedToken.id }).delete()

    return response.status(200).send();
  },

  /* Authentication */

  login : async (request, response) => {
    const { cnpj, password } = request.body;

    const ong = await connection('ongs').select('*').where({ cnpj });

    if (ong.length === 0) {
      return response.status(404).json({
        auth: false,
        message: 'Could Not Find The Ong'
      });
    }

    if (ong[0].active === 0) {
      return response.status(401).json({
        auth: false,
        message: "Confirm The Ong's Email!"
      })
    }

    const isMatched = await bcrypt.compare(password, ong[0].password);

    if (!isMatched) {
      return response.status(404).json({
        auth: false,
        message: 'Bad Password!'
      });
    }

    var token = jwebtoken.sign({ cnpj }, 'aklzaoililajh', {
      expiresIn: 1800
    });

    return response.status(200).json({ 
      auth: true,
      ong,
      token
    });
  },

  active : async (request, response) => {
    const id = request.headers['x-access-id'];

    let ong = await connection('ongs').select('*').where({ id });

    if (ong.length === 0) {
      return response.status(404).json({
        activated: false,
        message: 'Ong Not Found!'
      })
    } else {
      if (ong[0].active === 1) {
        return response.json({
          activated: true,
          message: 'Ong Already Activated!'
        })
      } else {
        ong = await connection('ongs').select('*').where({ id }).update({
          active: true
        })

        return response.json({
          activated: true,
          message: 'Ong Successful Activated!'
        })
      }
    }
  }
}
