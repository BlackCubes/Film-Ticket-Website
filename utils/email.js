const htmlToText = require('html-to-text');
const nodemailer = require('nodemailer');
const pug = require('pug');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.email;
    this.firstName = user.name.split(' ')[0];
    this.url = url;
    this.from = `Elias Gutierrez <${process.env.EMAIL_FROM}>`;
  }

  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      return 1;
    }

    return nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
      }
    });
  }

  async send(template, subject, ip = '', userAgent = '') {
    const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
      firstName: this.firstName,
      url: this.url,
      subject,
      ip,
      userAgent
    });

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html)
    };

    await this.newTransport().sendMail(mailOptions);
  }

  async sendWelcome() {
    await this.send('welcome', 'Welcome to Kinetotickets!');
  }

  async sendPasswordReset(ip, userAgent) {
    await this.send(
      'passwordReset',
      'Use this link to reset your password. The link is only valid for 10 minutes.',
      ip,
      userAgent
    );
  }

  async sendPasswordResetHelp(ip, userAgent) {
    await this.send(
      'passwordResetHelp',
      'We received a request to reset your password with this email address.',
      ip,
      userAgent
    );
  }
};
