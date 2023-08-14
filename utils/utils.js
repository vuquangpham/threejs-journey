const path = require('path');
const {isPathExistAsync, createDirectory, copyFile} = require("./os");

/**
 * String to slug
 * @param string {string}
 * @return {string}
 * */
const stringToSlug = (string) => {
    if(!string) return '';
    return string.normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .replace(/đ/g, 'd').replace(/Đ/g, 'D')
        .replace(/[^\w ]+/g, '')
        .replace(/ +/g, '-')
        .toLowerCase();
};


/**
 * Create JS Base with multiple files automatically
 * @param appPath {string}
 * @param baseName {string}
 * @param pageId {string}
 * @return {void}
 * */
const createJsBase = (appPath, baseName, pageId) => {
    // check if folder exist or not
    const baseDirectory = path.join(appPath, baseName);

    isPathExistAsync(baseDirectory)
        .catch(async() => {
            // create directory
            createDirectory(baseDirectory);
            const defaultTemplateDirectory = path.join(baseDirectory, '..', 'template');

            // create index.js file
            copyFile(path.join(defaultTemplateDirectory, 'index.js'), path.join(baseDirectory, 'index.js'));

            // create template.js file
            await copyFile(path.join(defaultTemplateDirectory, 'template.js'), path.join(baseDirectory, 'template.js'));
        })
        .finally(() => {
            // create pageId folder
            const pageIdDirectory = path.join(baseDirectory, pageId);
            createDirectory(pageIdDirectory);

            // create pageId file
            copyFile(path.join(baseDirectory, 'template.js'), path.join(pageIdDirectory, 'index.js'));
        });
};


/**
 * Create View Engine Base with multiple files automatically
 * @param appPath {string}
 * @param baseName {string}
 * @param pageId {string}
 * @return {void}
 * */
const createEngineBase = (appPath, baseName, pageId) => {
    // check if folder exist or not
    const baseDirectory = path.join(appPath, baseName);

    isPathExistAsync(baseDirectory)
        .catch(async() => {
            // create directory first
            createDirectory(baseDirectory);

            // template path
            const defaultTemplateDirectory = path.join(baseDirectory, '..', 'template');
            await copyFile(path.join(defaultTemplateDirectory, 'template.ejs'), path.join(baseDirectory, 'template.ejs'));
        })
        .finally(() => {
            // create pageId file
            copyFile(path.join(baseDirectory, 'template.ejs'), path.join(baseDirectory, pageId + '.ejs'));
        });
};


/**
 * Create pages prototype
 * */
const createPagesPrototype = (prototypes = []) => prototypes.map(prototype => {
    const {pages} = prototype;

    const appPagesPath = path.join('app', 'pages');
    const viewEnginePath = path.join('views');

    pages.forEach((page) => {
        if(!page.id){
            page.id = stringToSlug(page.title);
        }

        // create js directory
        createJsBase(appPagesPath, prototype.base, page.id);

        // view engine template
        createEngineBase(viewEnginePath, prototype.base, page.id);
    });

    return prototype;
});

module.exports = {
    createPagesPrototype
};