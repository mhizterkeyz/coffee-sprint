/* eslint-disable max-classes-per-file */
const config = require('./config');

class Address {
  constructor(email, name = '') {
    this.email = email;
    this.name = name;
  }
}

class Attachment {
  constructor(content, filename, type) {
    this.content = content;
    this.filename = filename;
    this.type = type;
  }
}

class Mail {
  constructor(subject, to, html, from, attachments = [], cc = [], bcc = []) {
    const { defaultFromEmail, defaultFromName } = config().sendGrid;
    this.from = from || new Address(defaultFromEmail, defaultFromName);
    this.to = to;
    this.subject = subject;
    this.html = html;
    this.attachments = attachments;
    this.cc = cc;
    this.bcc = bcc;
  }
}

exports.Attachment = Attachment;
exports.Mail = Mail;
exports.Address = Address;
