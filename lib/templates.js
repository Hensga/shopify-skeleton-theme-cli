const fs = require("fs");
const path = require("path");

function createTemplates(themePath, sourcePath) {
  const templatesPath = path.join(themePath, "templates");
  if (!fs.existsSync(templatesPath)) {
    fs.mkdirSync(templatesPath, { recursive: true });
  }

  const files = fs.readdirSync(sourcePath);

  files.forEach((file) => {
    if (path.extname(file) === ".json") {
      const content = fs.readFileSync(path.join(sourcePath, file), "utf8");
      const targetFilePath = path.join(templatesPath, file);
      fs.writeFileSync(targetFilePath, content);
    }
  });
}

module.exports = createTemplates;
