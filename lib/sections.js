const fs = require("fs");
const path = require("path");

function createSections(themePath, sourcePath) {
  const sectionsPath = path.join(themePath, "sections");
  if (!fs.existsSync(sectionsPath)) {
    fs.mkdirSync(sectionsPath, { recursive: true });
  }

  const files = fs.readdirSync(sourcePath);

  files.forEach((file) => {
    if (path.extname(file) === ".liquid") {
      const content = fs.readFileSync(path.join(sourcePath, file), "utf8");
      const targetFilePath = path.join(sectionsPath, file);
      fs.writeFileSync(targetFilePath, content);
    }
  });
}

module.exports = createSections;
