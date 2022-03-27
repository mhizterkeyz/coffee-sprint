const axios = require('axios');
const config = require('../shared/config');

let anonymousSmsAxios;

class SmsService {
  constructor() {
    const { apiUrl } = config().anonymousSms;
    anonymousSmsAxios = axios.create({
      baseURL: apiUrl,
    });
  }

  async sendSms(recipient, message) {
    await anonymousSmsAxios.post('/notifications/sms', {
      sender: 'N-Alert',
      recipient,
      message,
    });
  }
}

module.exports = new SmsService();
