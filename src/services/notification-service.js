const config = require('../shared/config');
const logger = require('../shared/logger');
const { Address, Mail } = require('../shared/email-types');
const EmailService = require('./email-service');
const TemplateService = require('./template-service');
const SmsService = require('./sms-service');

class NotificationService {
  static sendAuthVerification(payload) {
    const { phoneVerificationCode, emailVerificationCode, user } = payload;
    const { dynamicLink } = config();
    if (emailVerificationCode) {
      const verifyLink = `${dynamicLink}/auth/verify-email?code=${emailVerificationCode}`;
      EmailService.sendEmail(
        new Mail(
          'Verify Email',
          new Address(user.email, user.name),
          TemplateService.parseHtmlTemplate('verify-email-template', {
            name: user.name,
            verifyLink,
          }),
        ),
      ).catch((error) => {
        logger.error(
          `error sending email verification email - ${error.message}`,
          { user: user.id },
        );
      });
    }

    SmsService.sendSms(
      user.phone,
      `Hi ${user.name},\nClick the link below to verify your phonenumber.\n${dynamicLink}/auth/verify-phone?code=${phoneVerificationCode}`,
    ).catch((error) => {
      logger.error(`error sending phone verification sms - ${error.message}`, {
        user: user.id,
      });
    });
  }
}

module.exports = NotificationService;
