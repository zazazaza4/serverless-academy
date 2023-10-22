const fs = require("fs");

function loadEnv(path) {
  try {
    const envContent = fs.readFileSync(".env", "utf8");

    const lines = envContent.split("\n");
    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine && !trimmedLine.startsWith("#")) {
        const [key, value] = trimmedLine.split("=");
        if (key && value) {
          process.env[key] = value;
        }
      }
    }
  } catch (e) {
    console.error("Error loading environment variables", e);
  }
}

loadEnv();
