'use strict';
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.send = async (to, subject, body) => {
  sgMail.send({
    to,
    from: 'limabrot879@gmail.com',
    subject: 'Bem-Vindo(a) ao EnvX,',
    text: 'Nossa Plataforma de Preservação Ambiental!',
    html: body
  })
}
