const fs = require("fs");
const path = require("path");

function createConfig(themePath) {
  const configPath = path.join(themePath, "config");
  fs.mkdirSync(configPath, { recursive: true });

  const configFiles = ["settings_data.json"];
  const configFileContents = {
    "settings_data.json": "[]",
  };

  configFiles.forEach((fileName) => {
    const filePath = path.join(configPath, fileName);
    fs.writeFileSync(filePath, configFileContents[fileName]);
  });
}

module.exports = createConfig;
