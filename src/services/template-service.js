const { configure } = require('nunjucks');
const Path = require('path');

const path = Path.join(__dirname, '../../', 'templates');
const templateEngine = configure(path, { autoescape: true });

class TemplateService {
  parseHtmlTemplate(template, context) {
    return templateEngine.render(template, context);
  }
}

module.exports = TemplateService;
