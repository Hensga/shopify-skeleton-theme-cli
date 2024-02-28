#!/usr/bin/env node

const { program } = require('commander');
const fs = require('fs');
const path = require('path');

program
  .name('hh-dev')
  .description('CLI tool for creating Shopify skeleton theme structure')
  .version('0.1.0');

program
  .command('create <theme-name>')
  .description('Create a new Shopify skeleton theme structure')
  .action((themeName) => {
    const themePath = path.join(process.cwd(), themeName);
    // Assets Ordner
    const assetsFiles = ['globals.css', 'globals.js'];
    const assetsFileContents = {
      'globals.css': '/* Globale CSS */',
      'globals.js': '/* Globale JS */',
    };

    // config Ordner
    const configFiles = ['settings_data.json'];
    const configFileContents = {
      'settings_data.json': '[]',
    };

    // Locales Ordner
    const localesFiles = ['en.default.json'];
    const localesFileContents = {
      'en.default.json': '',
    };

    // Layout Ordner
    // const layoutFiles = ['password.liquid'];
    // const layoutFileContents = {
    //   'password.liquid': '<!-- Passwort-Inhalt -->',
    // };

    //   Section Ordner
    const sectionsFiles = [
      'header.liquid',
      'footer.liquid',
      'main-product.liquid',
      'main-collection.liquid',
      'main-list-collections.liquid',
      'main-blog.liquid',
      'main-page.liquid',
      'main-password.liquid',
      'main-login.liquid',
      'main-register.liquid',
      'main-account.liquid',
      'main-active-account.liquid',
      'main-reset-password.liquid',
      'main-search.liquid',
      'main-order.liquid',
    ];
    const sectionFileContents = {
      'header.liquid': '<!-- Header-Inhalt -->',
      'footer.liquid': '<!-- Footer-Inhalt -->',
      'main-product.liquid': '<!-- Haupt-Produkt-Inhalt -->',
      'main-collection.liquid': '<!-- Haupt-Kollektion-Inhalt -->',
      'main-list-collections.liquid':
        '<!-- Haupt-Kollektionen-Liste-Inhalt -->',
      'main-blog.liquid': '<!-- Haupt-Blog-Inhalt -->',
      'main-page.liquid': '<!-- Haupt-Seite-Inhalt -->',
      'main-password.liquid': '<!-- Haupt-Passwort-Inhalt -->',
      'main-login.liquid': '<!-- Haupt-Login-Inhalt -->',
      'main-register.liquid': '<!-- Haupt-Registrieren-Inhalt -->',
      'main-account.liquid': '<!-- Haupt-Account-Inhalt -->',
      'main-active-account.liquid': '<!-- Haupt-Account aktivieren-Inhalt -->',
      'main-reset-password.liquid':
        '<!-- Haupt-Passwort zurücksetzen-Inhalt -->',
      'main-search.liquid': '<!-- Haupt-Suche-Inhalt -->',
      'main-order.liquid': '<!-- Haupt-Bestell-Inhalt -->',
    };

    //   Snippets Ordner
    const snippetsFiles = ['collection-media.liquid', 'product-media.liquid'];
    const snippetFileContents = {
      'collection-media.liquid': '<!-- Kollektion-Media-Inhalt -->',
      'product-media.liquid': '<!-- Produkt-Media-Inhalt -->',
    };

    //   Templates Ordner
    const templatesFiles = [
      '404.liquid',
      'article.liquid',
      'blog.liquid',
      'cart.liquid',
      'collection.liquid',
      'index.liquid',
      'list-collections.liquid',
      'product.liquid',
      'page.liquid',
      'password.liquid',
      'robots.txt.liquid',
      'search.liquid',
      'metaobject.liquid',
    ];
    const templateFileContents = {
      '404.liquid': '<!-- 404 Seite Inhalt -->',
      'article.liquid': '{% section "main-article" %}',
      'blog.liquid': '{% section "main-blog" %}',
      'cart.liquid': '{% section "main-cart" %}',
      'collection.liquid': '{% section "main-collection" %}',
      'index.liquid': '<!-- Index-Inhalt -->',
      'list-collections.liquid': '{% section "main-list-collections" %}',
      'product.liquid': '{% section "main-product" %}',
      'page.liquid': '{% section "main-page" %}',
      'password.liquid': '{% section "main-password" %}',
      'robots.txt.liquid': '<!-- Robots.txt-Inhalt -->',
      'search.liquid': '{% section "main-search" %}',
      'metaobject.liquid': '<!-- Meta-Objekt-Inhalt -->',
    };
    //  Customers Ordner
    const customersFiles = [
      'account.liquid',
      'activate_account.liquid',
      'addresses.liquid',
      'login.liquid',
      'order.liquid',
      'register.liquid',
      'reset_password.liquid',
    ];
    const customerFileContents = {
      'account.liquid': '<!-- Account-Inhalt -->',
      'activate_account.liquid': '<!-- Account aktivieren-Inhalt -->',
      'addresses.liquid': '<!-- Adressen-Inhalt -->',
      'login.liquid': '<!-- Login-Inhalt -->',
      'order.liquid': '<!-- Bestell-Inhalt -->',
      'register.liquid': '<!-- Registrieren-Inhalt -->',
      'reset_password.liquid': '<!-- Passwort zurücksetzen-Inhalt -->',
    };

    // Erstelle den Hauptordner
    if (!fs.existsSync(themePath)) {
      fs.mkdirSync(themePath, { recursive: true });

      // Einlesen der größeren Dateien. Es wird der absolute Pfad benötigt, damit die Datei, egal von wo der Befehl ausgeführt wird, gefunden wird.
      const themeContentPath = path.join(
        __dirname,
        'content',
        'theme-content.liquid'
      );
      const metaTagsContentPath = path.join(
        __dirname,
        'content',
        'meta-tags.liquid'
      );
      const passwordContentPath = path.join(
        __dirname,
        'content',
        'password.liquid'
      );

      // Erstelle Subfolders
      const assetsPath = path.join(themePath, 'assets');
      fs.mkdirSync(assetsPath, { recursive: true });
      const configPath = path.join(themePath, 'config');
      fs.mkdirSync(configPath, { recursive: true });
      const localesPath = path.join(themePath, 'locales');
      fs.mkdirSync(localesPath, { recursive: true });
      const layoutPath = path.join(themePath, 'layout');
      fs.mkdirSync(layoutPath, { recursive: true });
      const sectionsPath = path.join(themePath, 'sections');
      fs.mkdirSync(sectionsPath, { recursive: true });
      const snippetsPath = path.join(themePath, 'snippets');
      fs.mkdirSync(snippetsPath, { recursive: true });
      const templatesPath = path.join(themePath, 'templates');
      fs.mkdirSync(templatesPath, { recursive: true });
      // Subfolder für customers
      const customersPath = path.join(templatesPath, 'customers');
      fs.mkdirSync(customersPath, { recursive: true });

      // Erstelle Dateien in den Subfolders
      assetsFiles.forEach((fileName) => {
        const filePath = path.join(assetsPath, fileName);
        fs.writeFileSync(filePath, assetsFileContents[fileName]);
      });

      layoutFiles.forEach((fileName) => {
        const filePath = path.join(layoutPath, fileName);
        fs.writeFileSync(filePath, layoutFileContents[fileName]);
      });

      const themeContent = fs.readFileSync(themeContentPath, 'utf8');
      fs.writeFileSync(path.join(layoutPath, 'theme.liquid'), themeContent);

      const passwordContent = fs.readFileSync(passwordContentPath, 'utf8');
      fs.writeFileSync(
        path.join(layoutPath, 'password.liquid'),
        passwordContent
      );

      sectionsFiles.forEach((fileName) => {
        const filePath = path.join(sectionsPath, fileName);
        fs.writeFileSync(filePath, sectionFileContents[fileName]);
      });
      snippetsFiles.forEach((fileName) => {
        const filePath = path.join(snippetsPath, fileName);
        fs.writeFileSync(filePath, snippetFileContents[fileName]);
      });

      const metaTagsContent = fs.readFileSync(metaTagsContentPath, 'utf8');
      fs.writeFileSync(
        path.join(snippetsPath, 'meta-tags.liquid'),
        metaTagsContent
      );

      templatesFiles.forEach((fileName) => {
        const filePath = path.join(templatesPath, fileName);
        fs.writeFileSync(filePath, templateFileContents[fileName]);
      });
      customersFiles.forEach((fileName) => {
        const filePath = path.join(customersPath, fileName);
        fs.writeFileSync(filePath, customerFileContents[fileName]);
      });

      console.log(
        `Theme "${themeName}" was created successfully. Happy coding! 🚀`
      );
    } else {
      console.error(`Ordner "${themeName}" existiert bereits.`);
    }
  });

program.parse();
