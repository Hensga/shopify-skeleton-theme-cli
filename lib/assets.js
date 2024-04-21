const fs = require("fs");
const path = require("path");

function createAssets(themePath, sourcePath) {
  const assetsPath = path.join(themePath, "assets");
  if (!fs.existsSync(assetsPath)) {
    fs.mkdirSync(assetsPath, { recursive: true });
  }

  const files = fs.readdirSync(sourcePath);

  files.forEach((file) => {
    if (path.extname(file) === ".css" || path.extname(file) === ".js") {
      const content = fs.readFileSync(path.join(sourcePath, file), "utf8");
      const targetFilePath = path.join(assetsPath, file);
      fs.writeFileSync(targetFilePath, content);
    }
  });
}

module.exports = createAssets;
