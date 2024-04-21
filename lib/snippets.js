const fs = require("fs");
const path = require("path");

function createSnippets(themePath, sourcePath) {
  const snippetsPath = path.join(themePath, "snippets");
  if (!fs.existsSync(snippetsPath)) {
    fs.mkdirSync(snippetsPath, { recursive: true });
  }

  const files = fs.readdirSync(sourcePath);

  files.forEach((file) => {
    if (path.extname(file) === ".liquid") {
      const content = fs.readFileSync(path.join(sourcePath, file), "utf8");
      const targetFilePath = path.join(snippetsPath, file);
      fs.writeFileSync(targetFilePath, content);
    }
  });
}

module.exports = createSnippets;
