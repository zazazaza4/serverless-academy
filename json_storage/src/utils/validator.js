class Validator {
  static isEmail(email) {
    const emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return emailRegex.test(email);
  }

  static lengthRange(value, min, max) {
    return value.length >= min && value.length <= max;
  }

  static isRequired(value) {
    return value !== undefined && value !== null && value !== '';
  }
}

module.exports = Validator;
