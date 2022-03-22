class Response {
  static json(res, status, body) {
    res.status(status).json(body);
  }
}

module.exports = Response;
