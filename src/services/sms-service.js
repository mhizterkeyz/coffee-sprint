const axios = require('axios');
const config = require('../shared/config');

const { apiUrl } = config().anonymousSms;
const anonymousSmsAxios = axios.create({
  baseURL: apiUrl,
});
class SmsService {
  static async sendSms(recipient, message) {
    await anonymousSmsAxios.post('/notifications/sms', {
      sender: 'N-Alert',
      recipient,
      message,
    });
  }
}

module.exports = SmsService;
