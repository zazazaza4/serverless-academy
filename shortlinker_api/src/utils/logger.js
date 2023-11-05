class Logger {
  log(message) {
    console.log(`[LOG] ${message}`);
  }

  error(message) {
    console.error(`[ERROR] ${message}`);
  }

  warn(message) {
    console.warn(`[WARNING] ${message}`);
  }
}

module.exports = new Logger();
