const sendGrid = require('@sendgrid/mail');
const config = require('../shared/config');

class EmailService {
  constructor() {
    const { apiKey } = config().sendGrid;
    sendGrid.setApiKey(apiKey);
  }

  async sendEmail(mail) {
    await sendGrid.send(mail);
  }
}

module.exports = new EmailService();
