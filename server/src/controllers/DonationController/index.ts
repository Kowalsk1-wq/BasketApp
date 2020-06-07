import { prisma } from '../../config/prisma';
import { v4 as uuidV4 } from 'uuid';

import jwtdecode from 'jwt-decode';

export default new class DonationController {
  async listAll(_request: any, response: any) {
    const allDonations = await prisma.doacao.findMany({
      where: {
        approved: false
      },
      include: {
        doador: {
          include: {
            pessoa_fisica: true,
            pessoa_juridica: true
          }
        },
        produto: true,
        ong: true
      }
    });

    return response.json(allDonations);
  }

  async listAllApproved(_request: any, response: any) {
    const allDonations = await prisma.doacao.findMany({
      where: {
        approved: true
      },
      include: {
        doador: {
          include: {
            pessoa_fisica: true,
            pessoa_juridica: true
          }
        },
        produto: true,
        ong: true
      }
    });

    return response.json(allDonations);
  }

  async findIn(request: any, response: any) {
    const { number } = request.params;

    const targetDonation = await prisma.doacao.findMany({
      where: { numero: number },
      include: {
        doador: true,
        produto: true
      }
    });

    return response.json(targetDonation);
  }

  async findMe(request: any, response: any) {
    const token = request.headers['x-access-token'];
    const user: any = jwtdecode(token);

    let targetDoador;

    if (user.cpf) {
      targetDoador = await prisma.pessoa_fisica.findOne({
        where: {
          cpf: user.cpf
        },
        include: {
          doador: true
        }
      });
    } else if (user.cnpj) {
      targetDoador = await prisma.pessoa_juridica.findOne({
        where: {
          cnpj: user.cnpj
        },
        include: {
          doador: true
        }
      });
    }

    const meDonations = await prisma.doacao.findMany({
      where: {
        doador: targetDoador?.doador
      },
      include: {
        produto: true
      }
    });

    return response.json(meDonations);
  }

  async store(request: any, response: any) {
    const token = request.headers['x-access-token'];
    const user: any = jwtdecode(token);

    const {
      numero,
      titulo,
      descricao,
      quantidade,
      produtos
    } = request.body;

    let targetDoador;

    if (user.cpf) {
      targetDoador = await prisma.pessoa_fisica.findOne({
        where: {
          cpf: user.cpf
        },
        include: {
          doador: true
        }
      });
    } else if (user.cnpj) {
      targetDoador = await prisma.pessoa_juridica.findOne({
        where: {
          cnpj: user.cnpj
        },
        include: {
          doador: true
        }
      });
    }

    const idDoador = targetDoador?.doador?.id;

    const newDonation = await prisma.doacao.create({
      data: {
        approved: false,
        numero,
        titulo,
        descricao,
        quantidade,
        doador: {
          connect: { id: idDoador }
        }
      }
    });

    await produtos.map(async (p: {
      descricao: string,
      quantity: number
    }) => {
      await prisma.produto.create({
        data: {
          id: uuidV4(),
          descricao: p.descricao,
          quantidade: p.quantity,
          doacao: {
            connect: {
              numero
            }
          }
        }
      });
    });

    return response.json(newDonation);
  }

  async update(request: any, response: any) {

  }

  async remove(request: any, response: any) {
    const { number } = request.params;
    const user: any = jwtdecode(request.headers['x-access-token']);

    let targetDoador;

    if (user.cpf) {
      targetDoador = await prisma.pessoa_fisica.findOne({
        where: {
          cpf: user.cpf
        },
        include: {
          doador: true
        }
      });
    } else if (user.cnpj) {
      targetDoador = await prisma.pessoa_juridica.findOne({
        where: {
          cnpj: user.cnpj
        },
        include: {
          doador: true
        }
      });
    }

    const targetDonation = await prisma.doacao.findOne({
      where: {
        numero: number
      },
      include: {
        produto: true
      }
    });

    if (targetDonation?.id_doador !== targetDoador?.doador?.id) {
      return response.status(403).json({
        error: `Your aren't a donation's author`
      });
    } else if (targetDonation?.approved === true) {
      return response.status(403).json({
        error: "Your Can't Remove Accepted Donations"
      })
    } else {
      targetDonation?.produto.map(async (p: { id: any }) => {
        await prisma.produto.delete({
          where: {
            id: p.id
          }
        });
      })
      await prisma.doacao.delete({
        where: {
          numero: number
        }
      });

      return response.send();
    }
  }


  /*  Accepts  */

  async accept(request: any, response: any) {
    const { number } = request.params;
    const token = request.headers['x-access-token'];

    const Decoded: any = jwtdecode(token);

    const targetONG = await prisma.ong.findOne({
      where: { cnpj: Decoded.cnpj }
    });

    const acceptedDonation = await prisma.doacao.update({
      where: { 
        numero: number
      },
      data: {
        approved: true,
        ong: {
          connect: {
            cnpj: targetONG?.cnpj
          }
        }
      }
    });

    return response.json(acceptedDonation);
  }

  async sented(request: any, response: any) {
    const { number } = request.params;
    const token = request.headers['x-access-token'];

    const Decoded: any = jwtdecode(token);

    const targetONG = await prisma.ong.findOne({
      where: { cnpj: Decoded.cnpj }
    });

    const targetDonation = await prisma.doacao.findOne({
      where: {
        numero: number
      },
      include: {
        produto: true
      }
    });

    if (targetDonation?.cnpj_ong !== targetONG?.cnpj) return response.status(401).json({
      err: 'Operation Not Permitted!'
    });

    targetDonation?.produto.map(async (p: { id: any }) => {
      await prisma.produto.delete({
        where: {
          id: p.id
        }
      });
    })

    await prisma.doacao.delete({
      where: {
        numero: number
      }
    });

    return response.send();
  }
}
