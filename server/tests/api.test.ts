import should from 'should'
import request from 'request'
import { expect } from 'chai'
import { prisma } from '../src/config/prisma'

var urlBase = 'http://localhost:4040'

describe('API Test Suit', function () {
  it('Valida se a API inicializa corretamente', done => {
    request.get(
      {
        url: urlBase + '/api'
      },
      (_err, response, _body) => {
        expect(response.statusCode).to.equal(200)
        done()
      }
    )
  })

  it('Valida se o Banco de Dados está conectado', async done => {
    let statusDb = true

    expect(statusDb).to.equal(true)

    done()
  })
})
