#!/usr/bin/env node

const { program } = require("commander");
const fs = require("fs");
const path = require("path");
const createAssets = require("./lib/assets");
const createLayouts = require("./lib/layout");
const createConfig = require("./lib/config");
const createSections = require("./lib/sections");
const createSnippets = require("./lib/snippets");
const createTemplates = require("./lib/templates");

program
  .name("hh-dev")
  .description("CLI tool for creating Shopify skeleton theme structure")
  .version("0.1.0");

program
  .command("create <theme-name>")
  .description("Create a new Shopify skeleton theme structure")
  .action((themeName) => {
    const themePath = path.join(process.cwd(), themeName);
    const sectionsSourcePath = path.join(__dirname, "content", "sections");
    const assetsSourcePath = path.join(__dirname, "content", "assets");
    const snippetsSourcePath = path.join(__dirname, "content", "snippets");
    const templatesSourcePath = path.join(__dirname, "content", "templates");
    const layoutsSourcePath = path.join(__dirname, "content", "layout");

    if (!fs.existsSync(themePath)) {
      fs.mkdirSync(themePath, { recursive: true });

      createAssets(themePath, assetsSourcePath);
      createLayouts(themePath, layoutsSourcePath);
      createConfig(themePath);
      createSections(themePath, sectionsSourcePath);
      createSnippets(themePath, snippetsSourcePath);
      createTemplates(themePath, templatesSourcePath);

      function countFiles(directory) {
        return fs.readdirSync(directory).length;
      }
      console.info(
        `Theme "${themeName}" was created successfully. Happy coding! 🚀`,
      );
      console.info();
      console.info(`Assets copied: ${countFiles(assetsSourcePath)} files.`);
      console.info(`Layouts set up: ${countFiles(layoutsSourcePath)} files.`);
      console.info(`Configurations initialized.`);
      console.info(
        `Sections created: ${countFiles(sectionsSourcePath)} files.`,
      );
      console.info(`Snippets added: ${countFiles(snippetsSourcePath)} files.`);
      console.info(
        `Templates prepared: ${countFiles(templatesSourcePath)} files.`,
      );
      console.info();
      console.info("You can now begin customizing your theme!");

      console.info();
      console.info(
        "To begin developing your theme, navigate to your theme directory:",
      );
      console.info(`cd ${themePath}`);
      console.info(
        "Run your local development environment or upload the theme to Shopify to see it in action.",
      );

      console.info();
      console.info("For more information on developing Shopify themes, visit:");
      console.info("https://shopify.dev/docs/themes");

      console.info(
        "If you encounter any issues, please refer to the troubleshooting guide:",
      );
      console.info("https://shopify.dev/docs/themes/troubleshooting");
      console.info();
      console.info(
        "For questions or to provide feedback, please refer to the GitHub repository:",
      );
      console.info("https://github.com/Hensga/shopify-skeleton-theme-cli");
    } else {
      console.error(
        `Theme "${themeName}" already exists. Please choose another name.`,
      );
    }
  });

program.parse();
