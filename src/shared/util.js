class Util {
  static randomAlphabetic() {
    return 'abcdefghijklmnopqrstuvwxyz';
  }

  static randomAlphanumeric() {
    return 'a1b2c3d4e5f6g7h8i9j0klmnopqrstuvwxyz';
  }

  static generateRandomString(length, factory) {
    const _factory = factory || Util.randomAlphabetic();

    let generated = '';

    while (generated.length < length) {
      generated += _factory[Math.floor(Math.random() * _factory.length)];
    }

    return generated;
  }
}

module.exports = Util;
