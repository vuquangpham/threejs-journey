const fs = require('fs');
const path = require('path');
const {VIEW_ENGINE} = require('./configs');

/**
 * Check folder exist
 * */
const isPathExistSync = (directoryPath, folderName, extension = '') => {
    if(!folderName && !extension) return fs.existsSync(directoryPath);
    return fs.existsSync(path.join(directoryPath, folderName + extension));
};


/**
 * Clone file
 * */
const cloneFile = ({
                       source = '',
                       destination = '',
                       callback = () => {
                       }
                   }) => {
    // destination already exist => not run
    if(isPathExistSync(destination)) return;

    // source doesn't exist
    if(!isPathExistSync(source)) return;

    // clone file
    fs.copyFile(source, destination, (err) => {
        if(err){
            callback(false);
            return;
        }
        callback(true);
    });
};


/**
 * Create Directory
 * */
const createDirectory = (path) => {
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
};


/**
 * String to slug
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
 * Create pages prototype
 * */
const extensionEngine = '.' + VIEW_ENGINE;
const createPagesPrototype = (prototypes = []) => prototypes.map(prototype => {
    const {pages} = prototype;

    const appPath = path.join('app', 'pages', prototype.base);
    const viewEnginePath = path.join('views', prototype.base);

    pages.forEach((page) => {
        if(!page.id){
            page.id = stringToSlug(page.title);
        }
        const templateName = `template`;

        // template doesn't exist => simply return, not create the prototype for it
        if(!isPathExistSync(appPath, templateName, '.js')){
            // create directory first
            createDirectory(appPath);

            // template path
            const templatePath = path.join(appPath, '..', 'template');

            cloneFile({
                source: path.join(templatePath, 'index.js'),
                destination: path.join(appPath, 'index' + '.js')
            });

            cloneFile({
                source: path.join(templatePath, 'template.js'),
                destination: path.join(appPath, templateName + '.js')
            });
        }

        // create directory
        createDirectory(path.join(appPath, page.id));

        // clone the template for the new-id
        cloneFile({
            source: path.join(appPath, templateName + '.js'),
            destination: path.join(appPath, page.id, 'index' + '.js')
        }); // app file

        // view engine template
        if(!isPathExistSync(viewEnginePath, templateName, extensionEngine)){
            // create directory first
            createDirectory(viewEnginePath);

            // template path
            const templatePath = path.join(viewEnginePath, '..', 'template');

            cloneFile({
                source: path.join(templatePath, `template${extensionEngine}`),
                destination: path.join(viewEnginePath, templateName + extensionEngine)
            });
        }

        cloneFile({
            source: path.join(viewEnginePath, templateName + extensionEngine),
            destination: path.join(viewEnginePath, page.id + extensionEngine)
        }); // engine file
    });

    return prototype;
});

module.exports = {
    createPagesPrototype
};