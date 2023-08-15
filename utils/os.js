const fs = require('fs');

/**
 * Check file exist or nor in async way
 * @param file {string}
 * @return {Promise}
 * */
const isPathExistAsync = async(file) => {
    return new Promise((resolve, reject) => {
        fs.promises.access(file, fs.constants.F_OK)
            .then(resolve)
            .catch(reject);
    });
};

/**
 * Create directory if it doesn't exist yet
 * @param path {string}
 * @return {void}
 * */
const createDirectory = (path) => {
    if(!fs.existsSync(path)){
        fs.mkdirSync(path);
    }
};


/**
 * Clone file
 * @param source {string}
 * @param destination {string}
 * @return {Promise}
 * */
const copyFile = (source = '', destination = '') => {
    return new Promise((resolve, reject) => {
        // destination already exist => not run
        if(fs.existsSync(destination)) resolve('The destination has already existed yet');

        // source doesn't exist
        if(!fs.existsSync(source)) resolve('The source doesn\'t exist');

        // clone file
        fs.copyFile(source, destination, (err) => {
            if(err){
                reject(err);
            }
            resolve();
        });
    });
};

module.exports = {
    isPathExistAsync,
    createDirectory,
    copyFile
};