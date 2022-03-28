const sendGrid = require('@sendgrid/mail');
const config = require('../shared/config');

const { apiKey } = config().sendGrid;
sendGrid.setApiKey(apiKey);
class EmailService {
  static async sendEmail(mail) {
    await sendGrid.send(mail);
  }
}

module.exports = EmailService;
