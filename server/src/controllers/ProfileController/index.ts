import axios from 'axios';
import { prisma } from '../../config/prisma';
import { v4 as uuidv4 } from 'uuid';
import { hash, compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import emailService from '../../services/email';

export default new class SessionController {

  /*                  List                   */

  async listPf(request: any, response: any) {
    const allPfs = await prisma.pessoa_fisica.findMany({
      include: {
        doador: true
      }
    });

    return response.json(allPfs);
  }

  async listPj(request: any, response: any) {
    const allPjs = await prisma.pessoa_juridica.findMany({
      include: {
        doador: true
      }
    });

    return response.json(allPjs);
  }

  async listONG(request: any, response: any) {
    const allONGs = await prisma.ong.findMany();

    return response.json(allONGs);
  }


  /*                  Create                   */

  async createPf(request: any, response: any) {
    const { data } = request.file;
    const {
      nome,
      sobrenome,
      email,
      senha,
      genero,
      nascimento,
      cpf,
      telefone,
      cidade,
      estado
    } = request.body;

    const pf = await prisma.pessoa_fisica.findOne({
      where: { cpf }
    });

    if (!pf) {
      const id = uuidv4();

      const hashPwd = await hash(senha, 12);

      const newPf = await prisma.pessoa_fisica.create({
        data: {
          nome,
          sobrenome,
          genero,
          nascimento,
          cpf,
          doador: {
            create: {
              id,
              active: false,
              foto: data.link,
              hashdelete: data.deletehash,
              email,
              senha: hashPwd,
              telefone,
              cidade,
              estado
            }
          }
        },
      });

      emailService(
        email,
        'Bem-Vindo ao BasketApp', 
        `
        <h1 style='margin-left:10%'>Bem-Vindo <strong>${nome} ${sobrenome}</strong></h1>
        <p>
          Você acaba de realizar o cadastro no BasketApp como uma Pessoa Física <br/>
          Para ter acesso à nossa plataforma, siga estes passos: <br/>
          >> 1) Clique <a href="http://localhost:8080/user-actived">Aqui</a> para Ativar a Sua Conta <br/>

          >> 2) Escolha o tipo de usuário na chave seletora abaixo <br/>

          >> 3) Digite suas credenciais: <br/>
          <strong>CPF:</strong> ${cpf} <br/>
          <strong>Senha:</strong> a senha que você cadastrou! <br/>
          >> 4) Se Você conseguiu entrar na plataforma, muito bem, divirta-se! <br/>Agora, se não conseguiu,<br/> envie um email para nós agora mesmo: limabrot879@gmail.com e <strong>nos informe o seu problema</strong>
      </p>
        `
      );

      return response.json(newPf);
    } else {
      return response.json({
        error: 'User Already Exists!'
      });
    }
  }

  async createPj(request: any, response: any) {
    const { data } = request.file;
    const {
      razao_social,
      email,
      senha,
      cnpj,
      telefone,
      cidade,
      estado
    } = request.body;

    const pj = await prisma.pessoa_juridica.findOne({
      where: { cnpj }
    });

    if (!pj) {
      const id = uuidv4();
      const hashPwd = await hash(senha, 12);

      const newPj = await prisma.pessoa_juridica.create({
        data: {
          razao_social,
          cnpj,
          doador: {
            create: {
              id,
              active: false,
              foto: data.link,
              hashdelete: data.deletehash,
              email,
              senha: hashPwd,
              telefone,
              cidade,
              estado
            }
          }
        }
      });

      emailService(
        email,
        'Bem-Vindo ao BasketApp', 
        `
        <h1 style='margin-left:10%'>Bem-Vindo <strong>${razao_social}</strong></h1>
        <p>
          Você acaba de realizar o cadastro no BasketApp como uma Pessoa Jurídica <br/>
          Para ter acesso à nossa plataforma, siga estes passos: <br/>
          >> 1) Clique <a href="http://localhost:8080/user-actived">Aqui</a> para Ativar a Sua Conta <br/>

          >> 2) Escolha o tipo de usuário na chave seletora abaixo <br/>

          >> 3) Digite suas credenciais: <br/>
          <strong>CNPJ:</strong> ${cnpj} <br/>
          <strong>Senha:</strong> a senha que você cadastrou! <br/>
          >> 4) Se Você conseguiu entrar na plataforma, muito bem, divirta-se! <br/>Agora, se não conseguiu,<br/> envie um email para nós agora mesmo: limabrot879@gmail.com e <strong>nos informe o seu problema</strong>
        </p>
        `
      );

      return response.json(newPj);
    } else {
      return response.json({
        error: 'User Already Exists!'
      });
    }
  }

  async createONG(request: any, response: any) {
    const { data } = request.file;
    const {
      razao_social,
      cnpj,
      email,
      senha,
      telefone,
      cep,
      logradouro,
      bairro,
      complemento,
      cidade,
      estado,
      numero
    } = request.body;

    const ong = await prisma.ong.findOne({
      where: { cnpj }
    });
    
    if (!ong) {
      const hashPwd = await hash(senha, 12);

      const newONG = await prisma.ong.create({
        data: {
          razao_social,
          cnpj,
          active: false,
          foto: data.link,
          hashdelete: data.deletehash,
          senha: hashPwd,
          email,
          telefone,
          cep,
          logradouro,
          bairro,
          complemento,
          cidade,
          estado,
          numero
        }
      });

      emailService(
        email,
        'Bem-Vindo ao BasketApp', 
        `
        <h1 style='margin-left:10%'>Bem-Vindo <strong>${razao_social}</strong></h1>
        <p>
          Você acaba de realizar o cadastro no BasketApp como uma ONG <br/>
          Para ter acesso à nossa plataforma, siga estes passos: <br/>
          >> 1) Clique <a href="http://localhost:8080/ong-actived">Aqui</a> para Ativar a Sua Conta <br/>

          >> 2) Escolha o tipo de usuário na chave seletora abaixo <br/>

          >> 3) Digite suas credenciais: <br/>
          <strong>CNPJ:</strong> ${cnpj} <br/>
          <strong>Senha:</strong> a senha que você cadastrou! <br/>
          >> 4) Se Você conseguiu entrar na plataforma, muito bem, divirta-se! <br/>Agora, se não conseguiu,<br/> envie um email para nós agora mesmo: limabrot879@gmail.com e <strong>nos informe o seu problema</strong>
        </p>
        `
      );

      return response.json(newONG);
    } else {
      return response.json({
        error: 'ONG Already Exists!'
      });
    }
  }


  /*                  Update                   */

  async updatePf(request: any, response: any) {

  }

  async updatePj(request: any, response: any) {

  }

  async updateONG(request: any, response: any) {

  }


  /*                 Remove                   */

  async removePf(request: any, response: any) {
    const { user_cpf } = request.headers;

    const targetPf = await prisma.pessoa_fisica.findOne({
      where: {
        cpf: user_cpf
      },
      include: {
        doador: true
      }
    });

    if (!targetPf) {
      return response.status(404).json({
        err: 'User Not Found!'
      })
    }

    await axios.delete(`https://api.imgur.com/3/image/${targetPf.doador?.hashdelete}`, {
      headers: {
        'Authorization' : `Client-ID ${process.env.IMGUR_CLIENT_ID}`
      }
    });

    await prisma.doador.delete({
      where: {
        id: targetPf.doador?.id
      }
    });

    await prisma.pessoa_fisica.delete({
      where: {
        cpf: user_cpf
      }
    });

    return response.send();
  }

  async removePj(request: any, response: any) {
    const { user_cnpj } = request.headers;

    const targetPj = await prisma.pessoa_juridica.findOne({
      where: {
        cnpj: user_cnpj
      },
      include: {
        doador: true
      }
    });

    if (!targetPj) {
      return response.status(404).json({
        err: 'User Not Found!'
      })
    }

    await axios.delete(`https://api.imgur.com/3/image/${targetPj.doador?.hashdelete}`, {
      headers: {
        'Authorization' : `Client-ID ${process.env.IMGUR_CLIENT_ID}`
      }
    });

    await prisma.doador.delete({
      where: {
        id: targetPj.doador?.id
      }
    });

    await prisma.pessoa_juridica.delete({
      where: {
        cnpj: user_cnpj
      }
    });

    return response.send();
  }

  async removeONG(request: any, response: any) {
    const { ong_cnpj } = request.headers;

    const targetONG = await prisma.ong.findOne({
      where: {
        cnpj: ong_cnpj
      }
    });

    if (!targetONG) {
      return response.status(404).json({
        err: 'ONG Not Found!'
      })
    }

    await axios.delete(`https://api.imgur.com/3/image/${targetONG.hashdelete}`, {
      headers: {
        'Authorization' : `Client-ID ${process.env.IMGUR_CLIENT_ID}`
      }
    });

    await prisma.ong.delete({
      where: {
        cnpj: ong_cnpj
      }
    });

    return response.send();
  }


  /*                  Login                   */

  async loginPf(request: any, response: any) {
    const { cpf, senha } = request.body;

    const targetPf = await prisma.pessoa_fisica.findOne({
      where: {
        cpf
      },
      include: {
        doador: true
      }
    });

    if (!targetPf) {
      return response.status(404).json({ err: "User Not Found!" });
    }

    const isMatched = await compare(senha, targetPf.doador?.senha!);

    if (targetPf.doador?.active === false) {
      return response.status(401).json({
        auth: false,
        message: 'Confirm The User Email!'
      })
    }


    if (!isMatched) {
      return response.status(403).json({
        auth: false,
        message: 'Bad Password!'
      });
    }

    var token = sign({ cpf }, 'aklzaoililajh', {
      expiresIn: 3600
    });

    return response.status(200).json({ 
      auth: true,
      user: targetPf,
      token
    });
  }

  async loginPj(request: any, response: any) {
    const { cnpj, senha } = request.body;

    const targetPj = await prisma.pessoa_juridica.findOne({
      where: {
        cnpj
      },
      include: {
        doador: true
      }
    });

    if (!targetPj) {
      return response.json({ err: "User Not Found!" });
    }

    const isMatched = await compare(senha, targetPj.doador?.senha!);

    if (!isMatched) {
      return response.status(404).json({
        auth: false,
        message: 'Bad Password!'
      });
    }

    var token = sign({ cnpj }, 'aklzaoililajh', {
      expiresIn: 3600
    });

    return response.status(200).json({ 
      auth: true,
      user: targetPj,
      token
    });
  }

  async loginONG(request: any, response: any) {
    const { cnpj, senha } = request.body;

    const targetONG = await prisma.ong.findOne({
      where: {
        cnpj
      }
    });

    if (!targetONG) {
      return response.status(404).json({ err: "ONG Not Found!" });
    }

    const isMatched = await compare(senha, targetONG.senha!);

    if (!isMatched) {
      return response.status(406).json({
        auth: false,
        message: 'Bad Password!'
      });
    }

    var token = sign({ cnpj }, 'aklzaoililajh', {
      expiresIn: 3600
    });

    return response.status(200).json({ 
      auth: true,
      user: targetONG,
      token
    });
  }

  async activePf(request: any, response: any) {
    const { user_cpf } = request.params;

    const targetPf = await prisma.pessoa_fisica.findOne({
      where: { 
        cpf: user_cpf 
      },
      include: {
        doador: true
      }
    });

    if (!targetPf) {
      return response.json({
        active: false,
        msg: 'User Not Found!'
      });
    } else {
      const updatePf = await prisma.pessoa_fisica.update({
        where: { 
          cpf: user_cpf 
        },
        data: {
          doador: {
            update: {
              active: true
            }
          }
        }
      });

      return response.json({
        active: true,
        Pf: updatePf
      });
    }
  }

  async activePj(request: any, response: any) {
    const { user_cnpj } = request.params;

    const targetPj = await prisma.pessoa_juridica.findOne({
      where: { 
        cnpj: user_cnpj 
      },
      include: {
        doador: true
      }
    });

    if (!targetPj) {
      return response.json({
        active: false,
        msg: 'User Not Found!'
      });
    } else {
      const updatePj = await prisma.pessoa_juridica.update({
        where: { 
          cnpj: user_cnpj 
        },
        data: {
          doador: {
            update: {
              active: true
            }
          }
        }
      });

      return response.json({
        active: true,
        Pj: updatePj
      });
    }
  }

  async activeONG(request: any, response: any) {
    const cnpj = request.headers['x-target-cnpj'];

    const targetONG = await prisma.ong.findOne({
      where: { 
        cnpj
      }
    });

    if (!targetONG) {
      return response.json({
        active: false,
        msg: 'ONG Not Found!'
      });
    } else {
      const updateONG = await prisma.ong.update({
        where: { 
          cnpj 
        },
        data: {
          active: true
        }
      });

      return response.json({
        active: true,
        ONG: updateONG
      });
    }
  }
}
