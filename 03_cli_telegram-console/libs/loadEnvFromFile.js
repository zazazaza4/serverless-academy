const fs = require("fs");

const loadEnv = (path = ".env") => {
  try {
    const env = fs.readFileSync(path, "utf8");

    env.split("\n").forEach((line) => {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, value] = trimmedLine.split("=");
        if (key && value) {
          process.env[key] = value;
        }
      }
    });
  } catch (e) {
    console.error(`Error loading environment variables: ${e}`);
  }
};

loadEnv();
