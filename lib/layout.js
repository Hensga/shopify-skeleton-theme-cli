const fs = require("fs");
const path = require("path");

function createLayout(themePath, sourcePath) {
  const layoutPath = path.join(themePath, "layout");
  if (!fs.existsSync(layoutPath)) {
    fs.mkdirSync(layoutPath, { recursive: true });
  }

  const files = fs.readdirSync(sourcePath);

  files.forEach((file) => {
    if (path.extname(file) === ".liquid") {
      const content = fs.readFileSync(path.join(sourcePath, file), "utf8");
      const targetFilePath = path.join(layoutPath, file);
      fs.writeFileSync(targetFilePath, content);
    }
  });
}

module.exports = createLayout;
