const { configure } = require('nunjucks');
const Path = require('path');

const path = Path.join(__dirname, '../../', 'templates');
const templateEngine = configure(path, { autoescape: true });

class TemplateService {
  static parseHtmlTemplate(template, context) {
    return templateEngine.render(`${template}.njk`, context);
  }
}

module.exports = TemplateService;
