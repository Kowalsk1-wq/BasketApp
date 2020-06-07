import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

const send = async (to: any, subject: any, body: any) => {
  sgMail.send({
    to,
    from: 'limabrot879@gmail.com',
    subject: 'Bem-Vindo(a) ao BasketApp,',
    text: 'Nossa Plataforma Gratuita de Doações de Cestas Básicas',
    html: body
  })
}

export default send;
